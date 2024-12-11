import { useState } from 'react';
import { Modal } from 'flowbite-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { handleApiErrors } from '../utils/Helpers';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Meal } from '../models/Menu';
import { menuService } from '../services/MenuSevice';
import "/src/styles/Form.scss";

type Props = {
    show: boolean;
    onClose: () => void;
    menuId: number;
    meals: Meal[];
    onCreate: (data: Meal) => void;
};

const MealCreationModal = ({ show, onClose, menuId, meals, onCreate }: Props) => {

    const schema = yup.object({
        menuId: yup.number().positive().required(),
        name: yup.string().min(2, "Meal name must contain at least 2 characters").required("Meal name is required")
            .test("unique-name", "A meal with this name already exists", (value) => {
                return !(isDuplicateName(value));
            }),
        proteinPoints: yup.number().positive("Protein points cant be negative").min(1, "Protein points cant be lower than 1").required("Field is required"),
        carbsPoints: yup.number().positive("Carbs points cant be negative").min(1, "Carbs points cant be lower than 1").required("Field is required"),
        fatsPoints: yup.number().positive("Fats points cant be negative").min(1, "Fats points cant be lower than 1").required("Field is required"),
        order: yup.number().positive().min(1).required("Muscle group is required")
            .test("unique-order", "A meal with this order already exists", (value) => {
                return !(isDuplicateOrder(value));
            })
    });

    type FormData = yup.InferType<typeof schema>;

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<FormData>({
        defaultValues: {
            menuId: menuId,
            name: "",
            proteinPoints: 1,
            carbsPoints: 1,
            fatsPoints: 1,
            order: 1
        },
        resolver: yupResolver(schema)
    });

    const isDuplicateName = (name: string) => meals.some(m => m.name === name);

    const isDuplicateOrder = (order: number) => meals.some(m => m.order === order);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setIsLoading(true);

        menuService.createMeal(data).then((response) => {
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
        <Modal show={show} onClose={onClose} >
            <Modal.Header className='dark:bg-dropDownBg'><span className='text-2xl text-customBlue dark:text-customGold'>Create Meal</span></Modal.Header>
            <Modal.Body className='dark:bg-dropDownBg dark:text-white rounded-b'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <main className="flex flex-col gap-5">
                        <figure>
                            <label>Meal name:</label>
                            <input type="text" placeholder='Breakfast' className="bg-transparent border-2 focus:ring-2 focus:ring-customBlue dark:focus:ring-customGold focus:border-none dark:text-white block w-full border-gray-300 rounded-md" {...register("name")} />
                            {errors.name && <span className='text-customRed text-sm font-light'>{errors.name.message}</span>}
                        </figure>
                        <figure>
                            <label>Protein Points:</label>
                            <input type="number" className="bg-transparent border-2 focus:ring-2 focus:ring-customBlue dark:focus:ring-customGold focus:border-none dark:text-white block w-full border-gray-300 rounded-md" {...register("proteinPoints")} />
                            {errors.proteinPoints && <span className='text-customRed text-sm font-light'>{errors.proteinPoints.message}</span>}
                        </figure>
                        <figure>
                            <label>Carbs Points:</label>
                            <input type="number" className="bg-transparent border-2 focus:ring-2 focus:ring-customBlue dark:focus:ring-customGold focus:border-none dark:text-white block w-full border-gray-300 rounded-md" {...register("carbsPoints")} />
                            {errors.carbsPoints && <span className='text-customRed text-sm font-light'>{errors.carbsPoints.message}</span>}
                        </figure>
                        <figure>
                            <label>Fats Points:</label>
                            <input type="number" className="bg-transparent border-2 focus:ring-2 focus:ring-customBlue dark:focus:ring-customGold focus:border-none dark:text-white block w-full border-gray-300 rounded-md" {...register("fatsPoints")} />
                            {errors.fatsPoints && <span className='text-customRed text-sm font-light'>{errors.fatsPoints.message}</span>}
                        </figure>
                        <figure>
                            <label >Meal Order:</label>
                            <input type="number" className="bg-transparent border-2 focus:ring-2 focus:ring-customBlue dark:focus:ring-customGold focus:border-none dark:text-white block w-full border-gray-300 rounded-md" {...register("order")} />
                            {errors.order && <span className='text-customRed text-sm font-light'>{errors.order.message}</span>}
                        </figure>

                        <button type="submit" disabled={isLoading} className="save-button w-1/3 self-center">{isLoading ? "Loading..." : "Save"}</button>
                        {errors.root && <div className='text-customRed text-center text-sm font-light'>{errors.root.message}</div>}
                    </main>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default MealCreationModal;