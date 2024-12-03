import { useState } from 'react';
import { Modal } from 'flowbite-react';
import { MuscleGroup, Exercise } from '../models/Plan';
import { SubmitHandler, useForm } from 'react-hook-form';
import { exerciseService } from '../services/ExerciseService';
import { handleApiErrors } from '../utils/Helpers';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "/src/styles/Form.scss";

type Props = {
    show: boolean;
    onClose: () => void;
    muscleGroups: MuscleGroup[];
    exercises: Exercise[];
    onCreate: (data: Exercise) => void;
}

const schema = yup.object({
    name: yup.string().min(2, "Exercise name must be at least 2 characters").required("Exercise name is required"),
    muscleGroupName: yup.string().required("Muscle group is required")
});

type FormData = yup.InferType<typeof schema>;

const ExerciseCreationModal = ({ show, onClose, muscleGroups, exercises, onCreate }: Props) => {

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<FormData>({
        defaultValues: {
            name: ""
            , muscleGroupName: ""
        },
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        if (exercises.find(e => e.name === data.name)) {
            setError("name", { message: "An exercise with this name already exists." })
            return;
        }
        setIsLoading(true);
        exerciseService.createExercise(data).then((response) => {
            onCreate(response.data);
            reset();
            onClose();
        }).catch((error) => {
            const errorMsg = handleApiErrors(error);
            setError("root", { message: errorMsg });
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <Modal
            show={show}
            onClose={() => {
                onClose();
                reset();
            }}>
            <Modal.Header className='dark:bg-dropDownBg' ><span className='text-customBlue dark:text-customGold text-2xl'>Create Exercise</span></Modal.Header>
            <Modal.Body className='dark:bg-dropDownBg'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <main className="flex flex-col gap-5 ">
                        <div>
                            <select className="bg-transparent w-full focus:ring-2 focus:ring-customBlue dark:focus:ring-customGold focus:border-none border-gray-300 border-2 rounded-md dark:text-white" {...register("muscleGroupName")}>
                                <option value="" className='dark:bg-darkBg dark:text-white dark:hover:bg-mediumBg'>--Select muscle group--</option>
                                {muscleGroups?.map(({ id, name }) =>
                                    <option key={id} value={name} className='dark:bg-darkBg hover:bg-mediumBg dark:text-white'>{name}</option>
                                )}
                            </select>
                            {errors.muscleGroupName && <div className='dark:text-customRed'>{errors.muscleGroupName.message}</div>}
                        </div>
                        <div>
                            <input type="text" placeholder='Exercise Name' className="bg-transparent focus:ring-2 focus:ring-customBlue dark:focus:ring-customGold focus:border-none dark:text-white border-2 w-full border-gray-300 rounded-md " {...register("name")} />
                            {errors.name && <div className='dark:text-customRed'>{errors.name.message}</div>}
                        </div>

                        <button type="submit" disabled={isLoading} className="save-button w-1/3 self-center">{isLoading ? "Loading..." : "Save"}</button>
                        {errors.root && <div className='dark:text-customRed text-center'>{errors.root.message}</div>}
                    </main>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ExerciseCreationModal;