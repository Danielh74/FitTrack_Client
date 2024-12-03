import { ChangeEvent, useEffect, useState } from "react"
import '../styles/Card.scss';
import '../styles/Form.scss';
import { planService } from "../services/PlanService";
import { toast } from "react-toastify";
import { Plan, PlanDetails } from "../models/Plan";
import { handleApiErrors } from "../utils/Helpers";
import { FaRegCirclePlay } from "react-icons/fa6";
import Card from "./Card";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

type Prop = {
    plan: Plan;
};

const PlanCard = ({ plan }: Prop) => {
    const { currentUser, reloadUser } = useAuth();
    const [isChecked, setIsChecked] = useState(plan.isCompleted);
    const [isLoading, setIsLoading] = useState(false);
    const [userPlan, setUserPlan] = useState<Plan>(plan);
    const [selectedExercise, setSelectedExercise] = useState<PlanDetails | null>(null);
    const [newWeight, setNewWeight] = useState(0);
    const [error, setError] = useState("");
    const [inputOpen, setInputOpen] = useState(false);
    const [openAnimation, setOpenAnimation] = useState(false);

    useEffect(() => {
        setUserPlan(plan);
    }, [plan])

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        const checked = e.target.checked;
        setIsChecked(checked);

        const updatedPlan = {
            id: userPlan.id,
            name: userPlan.name,
            isCompleted: checked,
        };

        planService.updatePlanComplete(updatedPlan)
            .then((response) => {
                setUserPlan(response.data);

                if (checked) {
                    toast.success("Plan completed, good job!");
                }
                const updatedPlans = currentUser.plans.map(plan => {
                    if (plan.id === userPlan.id) {
                        return response.data;
                    }
                    return plan;
                });
                reloadUser({ ...currentUser, plans: updatedPlans });
            })
            .catch((error) => {
                const errorMsg = handleApiErrors(error);
                toast.error(errorMsg);
                console.error("Update Plan Error:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleOpenInput = (ex: PlanDetails) => {
        if (inputOpen && ex.id === selectedExercise?.id) {
            setOpenAnimation(false);
            setTimeout(() => {
                setInputOpen(false);
            }, 300);
        } else if (inputOpen) {
            setOpenAnimation(false);
            setTimeout(() => {
                setSelectedExercise(ex);
                setTimeout(() => { setOpenAnimation(true) }, 100)
                setNewWeight(ex.currentWeight || 0);
                setInputOpen(true);
            }, 300);
        } else {
            setSelectedExercise(ex);
            setTimeout(() => { setOpenAnimation(true) }, 100)
            setNewWeight(ex.currentWeight || 0);
            setInputOpen(true);
        }
        setError("");
    };

    const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (parseInt(e.target.value) < 0) {
            setError("Weight can't be less than 0");
        } else {
            setNewWeight(parseInt(e.target.value));
            setError("");
        }
    };

    const handleWeightUpdate = (ex: PlanDetails) => {
        if (ex.currentWeight === newWeight) {
            return;
        }

        setIsLoading(true);
        planService.updatePlanExercise({ id: ex.id, currentWeight: newWeight, previousWeight: ex.currentWeight })
            .then((response) => {
                const updatedPlan = {
                    ...userPlan, planDetails: userPlan.planDetails.map(pd => {
                        if (pd.id === ex.id) {
                            return response.data;
                        }
                        return pd;
                    })
                };
                setUserPlan(updatedPlan);
            }).catch((error) => {
                const errorMsg = handleApiErrors(error);
                toast.error(errorMsg);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div
            className="relative m-2 outer-card w-full">
            {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center">
                    <Loader />
                </div>
            )}

            <h1 className="flex">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChecked}
                    className="plan-checkbox self-center"
                    id={`${userPlan.id}`}
                />
                <label htmlFor={`${userPlan.id}`} className="text-2xl font-bold text-customBlue dark:text-customGold">{userPlan.name}</label>
            </h1>

            {userPlan.planDetails.map((ex) => (
                <Card customClass="mt-2" key={ex.orderInPlan}>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <div className="text-lg font-semibold text-customBlue dark:text-customGold">
                                <span className="me-1">{ex.orderInPlan}.</span>
                                <span>{ex.exerciseName}</span>
                            </div>
                            <div>
                                {ex.reps} reps, {ex.sets} sets
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <button className="text-black dark:text-white text-2xl">
                                <FaRegCirclePlay />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                        <div>
                            <span>Previous weight:</span>
                            <span className="flex justify-center">{ex.previousWeight ? `${ex.previousWeight} kg` : '--'}</span>
                        </div>
                        <div>
                            <span>Current weight:</span>
                            <span className="flex justify-center">{ex.currentWeight ? `${ex.currentWeight} kg` : '--'}</span>
                        </div>
                        <button
                            className={`rounded transition-all duration-75 text-black p-1 h-1/2 self-center font-semibold ${inputOpen && selectedExercise.id === ex.id ? "bg-red-500 dark:bg-customRed" : "bg-green-500 dark:bg-customGreen"}`}
                            onClick={() => handleOpenInput(ex)}>{inputOpen && selectedExercise.id === ex.id ? "Close" : "Update"}</button>
                    </div>

                    {inputOpen && selectedExercise.id === ex.id && (
                        <div className={`flex items-center gap-2 p-0.5 mt-2 weight-form ${openAnimation ? "open" : ""}`}>
                            <input
                                type="number"
                                value={newWeight}
                                onChange={handleWeightChange}
                                className=" bg-lightBg bg-opacity-50 text-lg rounded-md focus:ring-1 focus:ring-customBlue dark:focus:ring-customGold focus:border-none h-8"
                            />
                            <button
                                onClick={() => handleWeightUpdate(ex)}
                                className="px-2 save-button">
                                Save
                            </button>
                            {error && <div className="text-sm font-medium text-red-500 dark:text-customRed">{error}</div>}
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default PlanCard;