import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { Weight } from '../../models/Weight';
import Card from '../../components/Card';
import useTheme from '../../hooks/useTheme';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from '../../components/CustomTooltip';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "/src/styles/Toast.scss";
import Calendar from '../../components/Calendar';

const customGreen = '#9ACD32';
const customGold = '#FFD700';
const customBlue = '#274C77';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const { darkMode } = useTheme();
    const plansAmount = currentUser.plans.length;
    const mealsAmount = currentUser.menu === null ? 0 : currentUser.menu.meals.length;
    const [completedPlans, setCompletedPlans] = useState<number>(0);
    const [completedMeals, setCompletedMeals] = useState<number>(0);
    const [weightList, setWeightList] = useState<Weight[]>([]);

    useEffect(() => {
        const getValues = () => {
            const completedPlansCount = currentUser.plans.filter((plan => plan.isCompleted === true)).length;
            setCompletedPlans(completedPlansCount);

            const completedMealsCount = currentUser.menu?.meals?.filter((meal => meal.isCompleted === true)).length || 0;
            setCompletedMeals(completedMealsCount);

            setWeightList(currentUser.weight.slice(-10));
        };
        getValues();

        return () => {
            setCompletedMeals(0)
            setCompletedPlans(0);
            setWeightList([]);
        }
    }, [currentUser]);

    return (
        <main className='pb-2'>
            <section className='flex flex-row h-64'>
                <Card title='Weight progression' customClass='dashboard-card flex-grow mb-3 text-center'>
                    <ResponsiveContainer className="py-2">
                        <LineChart data={weightList}>
                            <XAxis dataKey="timeStamp" stroke={`${darkMode ? 'white' : 'black'}`} />
                            <YAxis dataKey="value" stroke={`${darkMode ? 'white' : 'black'}`} />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Line type="monotone" dataKey="value" stroke={`${darkMode ? customGold : '#274C77'}`} />
                            <Tooltip content={<CustomTooltip active={true} payload={weightList.map((w) => w.value)} label={weightList.map((w) => w.timeStamp)} />} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </section>
            <article className='flex flex-wrap gap-2 sm:gap-0 sm:flex-row h-auto'>
                <figure className='flex flex-col flex-grow sm:w-1/2 md:w-1/3 lg:w-1/5 px-1'>
                    <Card title='Workout progress' customClass='dashboard-card'>
                        <CircularProgressbar
                            className='pt-3'
                            value={plansAmount > 0 ? completedPlans / plansAmount * 100 : 0}
                            text={`${completedPlans}/${plansAmount}`}
                            styles={{
                                path: {
                                    stroke: `${completedPlans / plansAmount === 1 ? darkMode ? customGreen : '#00ff00' : customBlue}`,
                                    strokeLinecap: 'round',
                                },
                                trail: {
                                    stroke: '#C5C5C5'
                                },
                                text: {
                                    fill: `${darkMode ? 'white' : 'black'}`,
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                },
                            }}
                        />
                    </Card>
                </figure>
                <figure className='flex flex-col flex-grow sm:w-1/2 md:w-1/3 lg:w-1/5 px-1'>
                    <Card title='Meals progress' customClass='dashboard-card'>
                        <CircularProgressbar
                            className='pt-3'
                            value={mealsAmount > 0 ? completedMeals / mealsAmount * 100 : 0}
                            text={`${completedMeals}/${mealsAmount}`}
                            styles={{
                                path: {
                                    stroke: `${completedMeals / mealsAmount === 1 ? darkMode ? customGreen : '#00ff00' : customBlue}`,
                                    strokeLinecap: 'round',

                                },
                                trail: {
                                    stroke: '#C5C5C5'
                                },
                                text: {
                                    fill: `${darkMode ? 'white' : 'black'}`,
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                },
                            }}
                        />
                    </Card>
                </figure>
                <figure className='flex flex-col flex-grow pt-3 md:pt-0 sm:w-1/2 md:w-1/3 lg:w-1/4 px-1'>
                    <Card customClass='dashboard-card text-xs'>
                        <Calendar />
                    </Card>
                </figure>
                <figure className='flex flex-col md:flex-row lg:flex-col pt-3 lg:pt-0 flex-grow sm:w-1/2 lg:w-1/4 ps-1 gap-3'>
                    <Card title='Tip' customClass='dashboard-card h-full '>
                        <span>Your recommended daily water intake is approx.
                            <b className='ms-1 text-customBlue dark:text-customGold'>{(weightList[weightList.length - 1]?.value * 0.04).toFixed(1)} liters.</b>
                        </span>
                    </Card>
                    <Card title='Tip' customClass='dashboard-card h-full'>
                        <span>Weighing should be done <b className='text-customBlue dark:text-customGold'>once a week</b> in the morning after using the bathroom.</span>
                    </Card>
                    <Card title='Tip' customClass='dashboard-card h-full'>
                        <span>Trust the proccess!</span>
                    </Card>
                </figure>
            </article>
            <ToastContainer />
        </main>
    )
}

export default Dashboard