import { useEffect, useState } from 'react'
import { auth } from '../../services/UserService'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { User } from '../../models/User'
import { handleApiErrors } from '../../utils/Helpers'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader'
import Card from '../../components/Card'
import { MdArrowBack } from "react-icons/md";
import { Plan } from '../../models/Plan'
import { FiPlus } from "react-icons/fi";
import PlanCreationModal from '../../Modals/PlanCreationModal'
import { menuService } from '../../services/MenuSevice'
import "/src/styles/Toast.scss";

type PlanResponse = {
    plan: Plan;
    message: string;
};

const UserPage = () => {
    const { userId: userIdString } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const userId = parseInt(userIdString);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUser = () => {
            setIsLoading(true);
            auth.getUserInfo(userId).then((response) => {
                setUser(response);
            }).catch((error) => {
                const errorMsg = handleApiErrors(error);
                toast.error(errorMsg);
            }).finally(() => {
                setIsLoading(false);
            });
        };
        fetchUser();

        if (location.state && location.state.toastMessage) {
            toast.success(location.state.toastMessage);
            navigate(location.pathname, { replace: true, state: {} });
        }

        return () => {
            setUser(null);
        };
    }, [userId, location, navigate]);

    const createPlan = (data: PlanResponse) => {
        const updatedPlans: Plan[] = [...user.plans, data.plan];
        setUser(prev => ({ ...prev, plans: updatedPlans }));
        toast.success(data.message);
    };

    const createMenu = () => {
        menuService.createMenu(userId).then((response) => {
            const menu = response.data.menu;
            const message = response.data.message;
            setUser(prev => ({ ...prev, menu: menu }));
            toast.success(message);
        }).catch((error) => {
            const errorMsg = handleApiErrors(error);
            toast.error(errorMsg);
        });
    };

    return (
        <div className='relative'>
            {isLoading && <div className='absolute inset-0 flex justify-center items-center z-10'><Loader /></div>}
            {user &&
                <div className='flex flex-col'>
                    <Link to="/admin/users" className='self-start p-1 border-2 border-black rounded-full hover:bg-white hover:duration-150'><MdArrowBack className='text-2xl self-center' /></Link>
                    <main className="outer-card">
                        <h1 className="text-2xl font-bold text-customBlue dark:text-customGold pb-3">User Information</h1>
                        <div className='flex flex-col md:flex-row gap-4 w-full'>
                            <article className='flex flex-col w-full'>
                                <Card>
                                    <div className='flex flex-col gap-1'>
                                        <label className="font-medium text-customBlue dark:text-customGold">Full name:</label>
                                        <span className='border-2 border-gray-300 rounded-md text-center'> {user.firstName} {user.lastName}</span>
                                        <label className="font-medium text-customBlue dark:text-customGold">Age:</label>
                                        <span className='border-2 border-gray-300 rounded-md text-center'>{user.age}</span>
                                        <label className="font-medium text-customBlue dark:text-customGold">Gender:</label>
                                        <span className='border-2 border-gray-300 rounded-md text-center'>{user.gender}</span>
                                        <label className="font-medium text-customBlue dark:text-customGold">City:</label>
                                        <span className='border-2 border-gray-300 rounded-md text-center'>{user.city ? user.city : "N/A"}</span>
                                        <label className="font-medium text-customBlue dark:text-customGold">Goal:</label>
                                        <span className='border-2 border-gray-300 rounded-md text-center'>{user.goal}</span>
                                        <label className="font-medium text-customBlue dark:text-customGold">Email:</label>
                                        <span className='border-2 border-gray-300 rounded-md text-center'>{user.email}</span>
                                        <label className="font-medium text-customBlue dark:text-customGold">Phone number:</label>
                                        <span className='border-2 border-gray-300 rounded-md text-center'>{user.phoneNumber ?? 'N/A'} </span>
                                    </div>
                                </Card>
                            </article>

                            <article className='w-full' >
                                <Card>
                                    <div className='flex flex-col'>
                                        <figure className='border-2 p-2 rounded-md'>
                                            <h2 className="flex flex-row pb-2 font-medium text-customBlue dark:text-customGold">
                                                Weight progress:
                                            </h2>
                                            <div className='flex flex-row '>
                                                <p className='flex flex-col text-center w-1/3'>
                                                    Initial:
                                                    <br />
                                                    {user.weight[0]?.value ? user.weight[0].value + " kg" : "N/A"}
                                                </p>
                                                <div className='flex flex-col justify-center text-center w-1/3'>
                                                    {'>'}
                                                </div>
                                                <div className='flex flex-col text-center w-1/3'>
                                                    Current:
                                                    <br />
                                                    {user.weight[user.weight.length - 1] ? user.weight[user.weight.length - 1].value + " kg" : "N/A"}
                                                </div>
                                            </div>
                                        </figure>

                                        <figure className='border-2 p-2 my-1 rounded-md'>
                                            <p className='flex flex-row'>
                                                <span className="font-medium me-2 text-customBlue dark:text-customGold">Current body fat:</span>
                                                {user.bodyFatPrecentage === 0 ? "N/A" : user.bodyFatPrecentage + '%'}
                                            </p>
                                        </figure>

                                        <figure className='flex flex-col gap-4 border-2 rounded-md p-2'>
                                            <p className='flex flex-row'>
                                                <span className="font-medium me-2 text-customBlue dark:text-customGold">Neck circumference:</span>
                                                {user.neckCircumference === 0 ? "N/A" : user.neckCircumference + 'cm'}
                                            </p>
                                            <p className='flex flex-row'>
                                                <span className="font-medium me-2 text-customBlue dark:text-customGold">Chest circumference:</span>
                                                {user.pecsCircumference === 0 ? "N/A" : user.pecsCircumference + 'cm'}
                                            </p>
                                            <p className='flex flex-row'>
                                                <span className="font-medium me-2 text-customBlue dark:text-customGold">Arm circumference:</span>
                                                {user.armCircumference === 0 ? "N/A" : user.armCircumference + 'cm'}
                                            </p>
                                            <p className='flex flex-row'>
                                                <span className="font-medium me-2 text-customBlue dark:text-customGold">Waist circumference:</span>
                                                {user.waistCircumference === 0 ? "N/A" : user.waistCircumference + 'cm'}
                                            </p>
                                            <p className='flex flex-row'>
                                                <span className="font-medium me-2 text-customBlue dark:text-customGold">Abdominal circumference:</span>
                                                {user.abdominalCircumference === 0 ? "N/A" : user.abdominalCircumference + 'cm'}
                                            </p>
                                            <p className='flex flex-row'>
                                                <span className="font-medium me-2 text-customBlue dark:text-customGold">Waist circumference:</span>
                                                {user.waistCircumference === 0 ? "N/A" : user.waistCircumference + 'cm'}
                                            </p>
                                            <p className='flex flex-row'>
                                                <span className="font-medium me-2 text-customBlue dark:text-customGold">Thighs circumference:</span>
                                                {user.thighsCircumference === 0 ? "N/A" : user.thighsCircumference + 'cm'}
                                            </p>
                                        </figure>
                                    </div>
                                </Card>
                            </article>

                            <article className='w-full' >
                                <Card>
                                    <div className='flex flex-col'>
                                        <p className='flex flex-row font-semibold justify-between mb-1'>
                                            <span className=' text-customBlue dark:text-customGold'>Workout plans</span>
                                            <button onClick={() => setShowModal(true)}><FiPlus className='dark:bg-customGreen text-black bg-green-400 text-2xl p-1 rounded-full' /></button>
                                        </p>

                                        <div className='flex flex-wrap gap-1'>
                                            {user.plans.length > 0 ? user.plans.map((plan) => {
                                                return (
                                                    <figure key={plan.id} className='flex flex-col flex-grow'>
                                                        <Link
                                                            to={`/admin/user/${userId}/plan/${plan.id}`}
                                                            className='border-2 p-2 rounded-md my-1 text-start hover:bg-gray-300 dark:hover:bg-white dark:hover:bg-opacity-15' >
                                                            <h3 className='font-medium text-customBlue dark:text-customGold'>{plan.name}</h3>
                                                            <ol>
                                                                {plan.planDetails.map(({ id, exerciseName, reps, sets, orderInPlan }) =>
                                                                    <li key={id} className='text-sm'>
                                                                        {orderInPlan}. {exerciseName}- <span className='text-xs font-light'>Reps: {reps} Sets:{sets}</span>
                                                                    </li>
                                                                )}
                                                            </ol>
                                                        </Link>
                                                    </figure>
                                                )
                                            }) : "No plans assigned to the user"}
                                        </div>
                                    </div>
                                </Card>
                            </article>

                            <article className='w-full' >
                                <Card>
                                    <div className='flex flex-col'>
                                        <p className='flex flex-row justify-between mb-2 font-medium'>
                                            <span className='text-customBlue dark:text-customGold'>
                                                Menu
                                            </span>
                                            <button onClick={createMenu} disabled={user.menu ? true : false}>
                                                <FiPlus className={`${user.menu && " dark:bg-opacity-50  text-gray-400"} dark:bg-customGreen bg-green-400 p-1 text-black text-2xl rounded-full`} />
                                            </button>
                                        </p>
                                        {user.menu
                                            ?
                                            <Link
                                                to={`/admin/user/${userId}/menu/${user.menu.id}`}
                                                className='border-2 p-2 rounded-md my-1 text-start hover:bg-gray-300 dark:hover:bg-white dark:hover:bg-opacity-15' >
                                                {user.menu.meals.length === 0 && <span className='font-medium'> Menu</span>}
                                                <ol>
                                                    {user.menu.meals
                                                        .sort((a, b) => a.order - b.order)
                                                        .map((meal) =>
                                                            <li key={meal.id} className='text-sm'>
                                                                <span className='text-customBlue dark:text-customGold'>{meal.name}</span> - <span className='text-xs '>Protein: {meal.proteinPoints} Carbs: {meal.carbsPoints} Fats: {meal.fatsPoints}</span>
                                                            </li>
                                                        )}
                                                </ol>
                                            </Link>
                                            : "Menu was not assigned to the user"
                                        }
                                    </div>
                                </Card>
                            </article>
                        </div>
                    </main >
                </div>
            }
            <PlanCreationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                plans={user?.plans}
                onCreate={createPlan}
            />
            <ToastContainer />
        </div>
    );
};

export default UserPage;