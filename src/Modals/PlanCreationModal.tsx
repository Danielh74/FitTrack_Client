import { useState } from 'react';
import { Modal } from 'flowbite-react';
import { Plan } from '../models/Plan';
import { SubmitHandler, useForm } from 'react-hook-form';
import { handleApiErrors } from '../utils/Helpers';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { planService } from '../services/PlanService';
import { useParams } from 'react-router-dom';
import "/src/styles/Form.scss";

type Props = {
    show: boolean;
    plans: Plan[];
    onClose: () => void;
    onCreate: (data: { plan: Plan, message: string }) => void;
}

const schema = yup.object({
    name: yup.string().min(2, "Plan name must be at least 2 characters").required("Plan name is required")
});

type FormData = yup.InferType<typeof schema>;

const PlanCreationModal = ({ show, onClose, plans, onCreate }: Props) => {

    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useParams();
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<FormData>({
        defaultValues: {
            name: ""
        },
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {

        if (plans.find(p => p.name === data.name)) {
            setError("name", { message: "A plan with this name already exists." })
            return;
        }
        setIsLoading(true);
        planService.createPlan(parseInt(userId), data.name).then((response) => {
            onCreate(response.data);
            reset();
            onClose();
        }).catch((error) => {
            const errorMsg = handleApiErrors(error);
            setError("root", { message: errorMsg });
        }).finally(() => {
            setIsLoading(false);
        });

    }

    return (
        <Modal show={show} onClose={onClose} >
            <Modal.Header className='dark:bg-dropDownBg '><span className='text-customBlue dark:text-customGold text-2xl'>Create A Plan</span></Modal.Header>
            <Modal.Body className='dark:bg-dropDownBg'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-6'>
                        <div>
                            <input type="text" placeholder='Plan Name' className="border-2 focus:ring-2 focus:ring-customBlue dark:focus:ring-customGold focus:border-none w-full border-gray-300 rounded-md bg-transparent dark:text-white" {...register("name")} />
                            {errors.name && <div className='text-red-500'>{errors.name.message}</div>}
                        </div>

                        <button type="submit" disabled={isLoading} className="save-button w-1/3 self-center">{isLoading ? "Loading..." : "Save"}</button>
                        {errors.root && <div className='text-red-500 text-center'>{errors.root.message}</div>}
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default PlanCreationModal;