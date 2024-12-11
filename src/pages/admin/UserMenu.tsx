import { Link, useNavigate, useParams } from "react-router-dom"
import Card from "../../components/Card"
import { useEffect, useState } from "react";
import { menuService } from "../../services/MenuSevice";
import { Meal, Menu } from "../../models/Menu";
import { deleteItem, handleApiErrors } from "../../utils/Helpers";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../components/Loader";
import MealCreationModal from "../../Modals/MealCreationModal";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "/src/styles/Form.scss";
import "/src/styles/navbar.scss";
import "/src/styles/Toast.scss";
import { HiDotsVertical } from "react-icons/hi";
import { Dropdown } from "flowbite-react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdArrowBack } from "react-icons/md";

const schema = yup.object({
    proteinPoints: yup.number().positive("Protein points cant be negative").min(1, "Protein points cant be lower than 1").required("Field is required"),
    carbsPoints: yup.number().positive("Carbs points cant be negative").min(1, "Carbs points cant be lower than 1").required("Field is required"),
    fatsPoints: yup.number().positive("Fats points cant be negative").min(1, "Fats points cant be lower than 1").required("Field is required"),
});

type FormFields = yup.InferType<typeof schema>;

function UserMenu() {
    const { userId: userIdString, menuId: menuIdString } = useParams();
    const userId = parseInt(userIdString);
    const menuId = parseInt(menuIdString);
    const navigate = useNavigate();
    const [menu, setMenu] = useState<Menu | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editMeal, setEditMeal] = useState({ active: false, mealId: 0 });
    const [formOpen, setFormOpen] = useState(false);
    const [form, setForm] = useState<FormFields>({ proteinPoints: 0, carbsPoints: 0, fatsPoints: 0 });
    const { handleSubmit, register, formState: { errors }, setError, reset } = useForm<FormFields>({
        defaultValues: form,
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const fetchMenuData = () => {
            setIsLoading(true);
            menuService.getMenu(userId).then((response) => {
                const sortedMenu: Menu = {
                    ...response.data,
                    meals: [...response.data.meals].sort((a, b) => a.order - b.order)
                };
                setMenu(sortedMenu);
            }).catch((error) => {
                const errorMsg = handleApiErrors(error);
                toast.error(errorMsg);
            }).finally(() => {
                setIsLoading(false);
            });
        };
        fetchMenuData();

        return () => { setMenu(null); }
    }, [userId]);

    const openForm = (meal: Meal) => {
        if (formOpen) {
            setFormOpen(false);

            setTimeout(() => {
                setEditMeal({ active: true, mealId: meal.id });
                const formValues: FormFields = {
                    proteinPoints: meal.proteinPoints,
                    carbsPoints: meal.carbsPoints,
                    fatsPoints: meal.fatsPoints
                };
                setForm(formValues);
                reset(formValues);
                setTimeout(() => setFormOpen(true), 50);
            }, 400);
        } else {
            setEditMeal({ active: true, mealId: meal.id });
            const formValues: FormFields = {
                proteinPoints: meal.proteinPoints,
                carbsPoints: meal.carbsPoints,
                fatsPoints: meal.fatsPoints
            };
            setForm(formValues);
            reset(formValues);
            setTimeout(() => setFormOpen(true), 100);
        }
    };

    const handleMealCreate = (meal: Meal) => {
        const updatedMenu = { ...menu, meals: [...menu.meals, meal] };
        setMenu(updatedMenu);
        toast.success("Meal created successfully");
    };

    const handleMealDelete = (mealId: number) => {
        menuService.deleteMeal(mealId).then((response) => {
            const updatedMeals = menu.meals.filter(m => m.id !== mealId);
            setMenu({ ...menu, meals: updatedMeals });
            toast.success(response.data);
        }).catch((error) => {
            const errorMsg = handleApiErrors(error);
            toast.error(errorMsg);
        });
    }

    const handleMenuDelete = () => {
        menuService.deleteMenu(menuId).then((response) => {
            setMenu(null);
            navigate(`/admin/user/${userId}`, { replace: true, state: { toastMessage: response.data } });
        }).catch((error) => {
            const errorMsg = handleApiErrors(error);
            toast.error(errorMsg);
        });
    };

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        setIsLoading(true);
        menuService.updateMeal(editMeal.mealId, data)
            .then((response) => {
                const updatedMeal = response.data;
                const updatedList = menu.meals.map((meal) => meal.id === updatedMeal.id ? updatedMeal : meal);
                setMenu((prev) => ({ ...prev, meals: updatedList }));
                toast.success("Meal updated!");
                setFormOpen(false);
                setTimeout(() => setEditMeal({ active: false, mealId: 0 }), 500);
            })
            .catch((error) => {
                const errorMsg = handleApiErrors(error);
                toast.error(errorMsg);
                setError("root", { message: errorMsg });
            })
            .finally(() => {
                setIsLoading(false);
            })

    };

    return (
        <div className="relative">
            {menu ?
                <div className="flex flex-col">
                    <Link to={`/admin/user/${userId}`} className='self-start p-1 border-2 border-black rounded-full hover:bg-white hover:duration-300 '><MdArrowBack className='text-2xl self-center' /></Link>
                    <div className="flex flex-row justify-center">
                        <main className="md:w-1/2 w-full outer-card" >
                            {isLoading && (
                                <div className="absolute inset-0 flex justify-center items-center z-10">
                                    <Loader />
                                </div>
                            )}
                            <div className='sm:flex flex-row font-semibold justify-between mb-1 items-center'>
                                <h1 className="dark:text-customGold text-customBlue text-2xl font-bold">{`${menu.userName}'s Menu`}</h1>
                                <button className="mt-1" onClick={() => setShowModal(true)}>
                                    <span className="dark:bg-customGreen bg-green-400 px-2 py-1 rounded-md font-medium">Add Meal</span>
                                </button>
                            </div>
                            {menu.meals?.map((meal) =>
                                <Card key={meal.id} customClass="border mt-3">
                                    <div className="flex flex-row justify-between font-medium">
                                        <h2 className="text-xl font-semibold">{meal.name}</h2>
                                        <Dropdown className="dark:bg-dropDownBg border-0" dismissOnClick={true} renderTrigger={() => <button className="hover:text-lg transition-all duration-75"><HiDotsVertical /></button>}>
                                            <Dropdown.Item icon={FaRegEdit} className="dropdown-item" onClick={() => openForm(meal)}>Edit</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item icon={MdDelete} className="dropdown-logout" onClick={() => deleteItem("meal", handleMealDelete, meal.id)}>Delete</Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                    <div className="flex flex-row justify-evenly mt-2">
                                        <span>Protein points: {meal.proteinPoints}</span>
                                        <span>Carbs points: {meal.carbsPoints}</span>
                                        <span>Fats points: {meal.fatsPoints}</span>
                                    </div>
                                    {(editMeal.active && editMeal.mealId === meal.id) && (
                                        <div className={`meal-form ${formOpen ? "open" : ""}`}>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="flex flex-col">
                                                    <label htmlFor="protein">Protein Points:</label>
                                                    <input id="protein" type="number" className="meal-field focus:ring-2 focus:ring-customBlue dark:focus:ring-customGold focus:border-none" {...register("proteinPoints")} />
                                                    {errors.proteinPoints && <div className="text-red-500 dark:text-customRed">{errors.proteinPoints.message}</div>}
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="carbs">Carbs Points:</label>
                                                    <input id="carbs" type="number" className="meal-field focus:ring-2 focus:ring-customBlue dark:focus:ring-customGold focus:border-none" {...register("carbsPoints")} />
                                                    {errors.carbsPoints && <div className="text-red-500 dark:text-customRed">{errors.carbsPoints.message}</div>}
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="fats">Fats Points:</label>
                                                    <input id="fats" type="number" className="meal-field focus:ring-2 focus:ring-customBlue dark:focus:ring-customGold focus:border-none" {...register("fatsPoints")} />
                                                    {errors.fatsPoints && <div className="text-red-500 dark:text-customRed">{errors.fatsPoints.message}</div>}
                                                </div>
                                                <div className="flex flex-row justify-center pt-2">
                                                    <button className="save-button w-1/4 mt-1">Save</button>
                                                    {errors.root && <div className="text-red-500 dark:text-customRed">{errors.root.message}</div>}
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </Card>
                            )}
                        </main >
                    </div>
                    <button onClick={() => deleteItem("menu", handleMenuDelete)} className="bg-red-500 dark:bg-customRed self-center px-3 rounded-md font-semibold py-1 mb-2">Delete</button>

                    <MealCreationModal
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        meals={menu?.meals}
                        menuId={menuId}
                        onCreate={handleMealCreate} />
                    <ToastContainer />
                </div > :
                <div>No menu was found</div>}
        </div>);
};

export default UserMenu;