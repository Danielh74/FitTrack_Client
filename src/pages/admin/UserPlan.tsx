import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { planService } from '../../services/PlanService';
import { Exercise, MuscleGroup, Plan } from '../../models/Plan';
import { handleApiErrors, deleteItem } from '../../utils/Helpers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader';
import Card from '../../components/Card';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdArrowBack } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import ExerciseCreationModal from '../../Modals/ExerciseCreationModal';
import { exerciseService } from '../../services/ExerciseService';
import "/src/styles/Form.scss";
import "/src/styles/Toast.scss";

type PlanExerciseForm = {
    id: number;
    exerciseName: string;
    orderInPlan: number;
    sets: number;
    reps: number;
};

function UserPlan() {

    const { userId: userIdString, planId: planIdString } = useParams();
    const planId = parseInt(planIdString);
    const userId = parseInt(userIdString);
    const navigate = useNavigate();
    const [sortedPlan, setSortedPlan] = useState<Plan | null>(null);
    const [exercises, setExercises] = useState<Exercise[] | null>(null);
    const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[] | null>(null);
    const [editMode, setEditMode] = useState({ createMode: false, updateMode: false });
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedMuscle, setSlectedMuscle] = useState("");
    const [selectedExercise, setSelectedExercise] = useState<PlanExerciseForm>({
        id: 0,
        exerciseName: "",
        orderInPlan: 1,
        reps: 1,
        sets: 1
    });
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<PlanExerciseForm>({
        defaultValues: selectedExercise,
    });

    useEffect(() => {
        const fetchExercisesData = () => {
            setIsLoading(true);

            Promise.all([
                planService.getPlan(planId),
                exerciseService.getAllExercises(),
                exerciseService.getAllMuscleGroups()
            ]).then(([planResponse, exercisesResponse, muscleGroupsResponse]) => {
                const sortedPlan: Plan = {
                    ...planResponse.data,
                    planDetails: [...planResponse.data.planDetails].sort((a, b) => a.orderInPlan - b.orderInPlan)
                };

                setSortedPlan(sortedPlan);
                setExercises(exercisesResponse.data);
                setMuscleGroups(muscleGroupsResponse.data);
            }).catch((error) => {
                const errorMsg = handleApiErrors(error);
                toast.error(errorMsg);
            }).finally(() => {
                setIsLoading(false);
            });
        };

        fetchExercisesData();

        return () => { setSortedPlan(null) }
    }, [planId]);

    useEffect(() => {
        reset(selectedExercise);
    }, [selectedExercise, reset]);

    const handleSuccessRequest = (message: string) => {
        toast.success(message);
        setEditMode({ createMode: false, updateMode: false });
        setSelectedExercise({
            id: 0,
            exerciseName: "",
            orderInPlan: 1,
            reps: 1,
            sets: 1
        });
    };

    const handleExerciseCreate = (exercise: Exercise) => {
        const updatedExercises = [...exercises, exercise];
        setExercises(updatedExercises);
    };

    const handleExerciseDelete = (id: number) => {
        planService.deletePlanExercise(id).then((response) => {
            toast.success(response.data);
            const updatedPlan = sortedPlan.planDetails.filter(p => p.id !== id);
            setSortedPlan({ ...sortedPlan, planDetails: updatedPlan });
        }).catch((error) => {
            const errorMsg = handleApiErrors(error);
            toast.error(errorMsg);
        });
    };

    const handlePlanDelete = () => {
        planService.deletePlan(planId).then((response) => {
            navigate(`/admin/user/${userId}`, { replace: true, state: { toastMessage: response.data } });
        }).catch((error) => {
            const errorMsg = handleApiErrors(error);
            toast.error(errorMsg);
        });
    };

    const onSubmit: SubmitHandler<PlanExerciseForm> = (data) => {
        const parsedData = {
            ...data,
            orderInPlan: Number(data.orderInPlan),
            reps: Number(data.reps),
            sets: Number(data.sets)
        }

        if (editMode.updateMode) {
            planService.updatePlanExercise(parsedData).then((response) => {
                const updatedExercise = response.data
                setSortedPlan(prevPlan => ({
                    ...prevPlan,
                    planDetails: prevPlan.planDetails.map(exercise =>
                        exercise.id === updatedExercise.id
                            ? {
                                ...exercise,
                                orderInPlan: updatedExercise.orderInPlan,
                                sets: updatedExercise.sets,
                                reps: updatedExercise.reps
                            }
                            : exercise
                    )
                }));
                handleSuccessRequest("Plan exercise updated!")
            }).catch((error) => {
                const errorMsg = handleApiErrors(error);
                setError("root", { message: errorMsg })
            });

        } else if (editMode.createMode) {

            const isExist = sortedPlan.planDetails.some(e => e.exerciseName === parsedData.exerciseName);
            if (isExist) {
                setError('exerciseName', { message: "The exercise already exists in the plan" });
                return;
            }

            const exerciseId = exercises.find(e => e.name === data.exerciseName)?.id;
            if (!exerciseId) {
                setError('exerciseName', { message: "Exercise was not found" })
                return;
            }

            const requestData = {
                exerciseId: exerciseId,
                planId: planId,
                orderInPlan: parsedData.orderInPlan,
                reps: parsedData.reps,
                sets: parsedData.sets
            }

            planService.createPlanExercise(requestData).then((response) => {
                if (response.status === 201) {
                    handleSuccessRequest("Plan exercise created!");

                    const updatedPlan = {
                        ...sortedPlan,
                        planDetails: [...sortedPlan.planDetails, response.data].sort((a, b) => a.orderInPlan - b.orderInPlan)
                    }
                    setSortedPlan(updatedPlan);
                }
            }).catch((error) => {
                const errorMsg = handleApiErrors(error);
                setError("root", { message: errorMsg })
            });
        }
    };

    return (
        <div className='flex flex-col relative'>
            <Link to={`/admin/user/${userId}`} className='self-start p-1 border-2 border-black rounded-full hover:bg-white hover:duration-300'><MdArrowBack className='text-2xl self-center' /></Link>
            {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center z-10">
                    <Loader />
                </div>
            )}
            {sortedPlan &&
                (
                    <main className='outer-card'>
                        <h1 className="text-2xl font-bold text-customBlue dark:text-customGold pb-3">Plan: {sortedPlan.name}</h1>
                        <article className='flex flex-col-reverse md:flex-row gap-3'>
                            <aside className='flex flex-col w-full md:w-1/3 gap-3'>
                                <div className='flex flex-row justify-between mx-2'>
                                    <button
                                        className="flex flex-row self-start dark:bg-customGreen bg-green-500 py-1 px-2 rounded-md font-semibold"
                                        onClick={() => {
                                            setEditMode({ updateMode: false, createMode: true });
                                            setSelectedExercise({
                                                id: 0,
                                                exerciseName: "",
                                                orderInPlan: 0,
                                                reps: 1,
                                                sets: 1
                                            });
                                        }}>Add exercise</button>
                                    <button
                                        className="self-center p-0.5 dark:bg-customGreen bg-green-500 rounded-md text-2xl"
                                        onClick={() => setShowModal(true)}><FaPlus /></button>
                                </div>
                                <div className='flex flex-col gap-3 overflow-x-auto max-h-[450px]'>
                                    {sortedPlan?.planDetails?.map(({ id, exerciseName, orderInPlan, reps, sets }) => (
                                        <Card key={exerciseName} customClass='flex flex-row border-2 border-gray-300 p-2 rounded-md '>
                                            <section className='flex flex-col border-e-2 w-full'>
                                                <header className='text-lg font-semibold underline'>Exercise {orderInPlan}:</header>
                                                <span>Name: {exerciseName}</span>
                                                <span>Reps: {reps}</span>
                                                <span>Sets: {sets}</span>
                                            </section>
                                            <div className='flex flex-row self-center justify-evenly w-full'>
                                                <button
                                                    onClick={() => {
                                                        setEditMode({ createMode: false, updateMode: true });
                                                        setSelectedExercise({
                                                            id: id,
                                                            exerciseName: exerciseName,
                                                            orderInPlan: orderInPlan,
                                                            reps: reps,
                                                            sets: sets
                                                        });
                                                    }} >
                                                    <FaRegEdit className='text-2xl hover:text-3xl' />
                                                </button>
                                                <button onClick={() => deleteItem("exercise", handleExerciseDelete, id)}>
                                                    <MdDelete className="text-2xl hover:text-3xl hover:text-customRed" />
                                                </button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </aside>
                            {(editMode.updateMode || editMode.createMode) &&
                                <Card customClass='flex flex-col flex-grow md:w-2/3 border-2 border-gray-300 rounded-md p-2 '>
                                    <h2 className="text-start text-xl mb-3 uppercase font-bold">{`${editMode.updateMode ? "Update" : "Create"} plan exercise:`}</h2>
                                    <form className="flex flex-col gap-2 w-2/3 self-center " onSubmit={handleSubmit(onSubmit)}>
                                        <div className='plan-field'>
                                            <label className="flex flex-col sm:flex-row gap-2">
                                                <span className='text-lg font-medium '>Muscles:</span>
                                                <select
                                                    onChange={(e) => setSlectedMuscle(e.target.value)}
                                                    disabled={editMode.updateMode}
                                                    className="bg-lightBg bg-opacity-25 dark:bg-opacity-50 text-lg rounded-md text-center w-full focus:ring-1 focus:ring-customBlue dark:focus:ring-customGold focus:border-none">
                                                    {editMode.updateMode
                                                        ? <option>{exercises.find(e => e.name === selectedExercise.exerciseName).muscleGroupName}</option>
                                                        : <>
                                                            <option className='dark:bg-darkBg' value="">--Select muscle group--</option>
                                                            {muscleGroups.map(({ id, name }) =>
                                                                <option
                                                                    key={id}
                                                                    value={name}
                                                                    className='dark:bg-darkBg'>
                                                                    {name}
                                                                </option>
                                                            )}
                                                        </>}
                                                </select>
                                            </label>
                                        </div>
                                        <div className='plan-field'>
                                            <label className="flex flex-col sm:flex-row gap-2">
                                                <span className='text-lg font-medium'>Exercise:</span>
                                                <select
                                                    disabled={editMode.updateMode}
                                                    {...register("exerciseName")}
                                                    className="bg-lightBg bg-opacity-25 dark:bg-opacity-50 rounded-md text-center w-full focus:ring-1 focus:ring-customBlue dark:focus:ring-customGold focus:border-none">
                                                    {editMode.updateMode
                                                        ? <option>{selectedExercise.exerciseName}</option>
                                                        : exercises.filter(e => e.muscleGroupName === selectedMuscle)
                                                            .map(({ id, name }) =>
                                                                <option
                                                                    key={id}
                                                                    value={name}
                                                                    className='dark:bg-darkBg'>
                                                                    {name}
                                                                </option>
                                                            )}
                                                </select>
                                            </label>
                                            {errors.exerciseName && <div className="text-red-500 dark:text-customRed flex flex-row justify-center mt-2">{errors.exerciseName.message}</div>}
                                        </div>

                                        <div className='plan-field'>
                                            <label className="flex flex-col sm:flex-row gap-2">
                                                <span className='text-lg font-medium'>Order in plan:</span>
                                                <input
                                                    {...register("orderInPlan", {
                                                        required: "Field is required",
                                                        min: {
                                                            value: 1,
                                                            message: "Exercise order can't be lower than 1"
                                                        },
                                                        validate: (value) => {
                                                            const currentPlan = sortedPlan;
                                                            const isOrderTaken = currentPlan.planDetails.some((p) => p.orderInPlan === Number(value) && p.id !== selectedExercise.id);
                                                            if (isOrderTaken) {
                                                                return "Exercise order is already taken";
                                                            }
                                                            return true;
                                                        }
                                                    })}
                                                    type='number'
                                                    className="bg-lightBg bg-opacity-25 dark:bg-opacity-50 text-lg rounded-md text-center w-full focus:ring-1 focus:ring-customBlue dark:focus:ring-customGold focus:border-none"
                                                />
                                            </label>
                                            {errors.orderInPlan && <div className="text-red-500 dark:text-customRed flex flex-row justify-center mt-2">{errors.orderInPlan.message}</div>}
                                        </div>

                                        <div className='plan-field'>
                                            <label className="flex flex-row gap-2" >
                                                <span className='text-lg font-medium'>Reps:</span>
                                                <input
                                                    {...register("reps", {
                                                        required: "Field is required",
                                                        min: {
                                                            value: 1,
                                                            message: "Reps can't be lower than 1"
                                                        }
                                                    })}
                                                    type='number'
                                                    className="bg-lightBg bg-opacity-25 dark:bg-opacity-50 text-lg rounded-md w-full text-center focus:ring-1 focus:ring-customBlue dark:focus:ring-customGold focus:border-none" />
                                            </label>
                                            {errors.reps && <div className="text-red-500 dark:text-customRed flex flex-row justify-center mt-2">{errors.reps.message}</div>}
                                        </div>

                                        <div className='plan-field'>
                                            <label className="flex flex-row gap-2">
                                                <span className='text-lg font-medium '>Sets:</span>
                                                <input {...register("sets", {
                                                    required: "Field is required",
                                                    min: {
                                                        value: 1,
                                                        message: "Sets can't be lower than 1"
                                                    }
                                                })}
                                                    type='number'
                                                    className="bg-lightBg bg-opacity-25 dark:bg-opacity-50 text-lg rounded-md w-full text-center focus:ring-1 focus:ring-customBlue dark:focus:ring-customGold focus:border-none" />
                                            </label>
                                            {errors.sets && <div className="text-red-500 dark:text-customRed flex flex-row justify-center mt-2">{errors.sets.message}</div>}
                                        </div>

                                        <div className="flex flex-row justify-center">
                                            <button
                                                type='submit'
                                                className="save-button w-1/3 mt-1">
                                                {editMode.createMode ? "Add" : "Save"}
                                            </button>
                                            {errors.root && <div className="text-red-500 dark:text-customRed">{errors.root.message}</div>}
                                        </div>
                                    </form>
                                </Card>
                            }
                        </article>
                    </main>
                )}
            <div className='flex flex-row justify-center pb-2'>
                <button onClick={() => deleteItem("plan", handlePlanDelete)} className="button bg-red-500 dark:bg-customRed">Delete plan</button>
            </div>
            <ToastContainer />
            <ExerciseCreationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                muscleGroups={muscleGroups}
                exercises={exercises}
                onCreate={handleExerciseCreate}
            />
        </div>
    );
};

export default UserPlan;