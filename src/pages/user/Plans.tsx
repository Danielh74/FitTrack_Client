import useAuth from "../../hooks/useAuth";
import PlanCard from "../../components/PlanCard";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useMemo } from "react";
import "/src/styles/Toast.scss";

function Plans() {
    const { currentUser } = useAuth();

    const sortedPlans = useMemo(() => {
        return currentUser.plans?.map(plan => ({
            ...plan,
            planDetails: [...plan.planDetails].sort((a, b) => a.orderInPlan - b.orderInPlan)
        }));
    }, [currentUser])

    return (
        <main className="flex flex-col md:flex-row w-full">
            {sortedPlans && sortedPlans.length > 0 ? (
                sortedPlans.map((plan) => (
                    <article key={plan.id} className="flex w-full">
                        <PlanCard
                            plan={plan}
                        />
                    </article>
                ))
            ) : (
                <span>There are no plans currently assign to you</span>
            )}
            <ToastContainer />
        </main>
    );
};

export default Plans;