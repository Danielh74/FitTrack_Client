import Card from "../../components/Card"
import useAdmin from "../../hooks/useAdmin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "/src/styles/Toast.scss";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import useTheme from "../../hooks/useTheme";
import Calendar from "../../components/Calendar";
import { Chart } from "react-google-charts";

function AdminDashboard() {
    const { users } = useAdmin();
    const { darkMode } = useTheme();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const [barChartData, setBarChartData] = useState(
        months.map((month) => ({ male: 0, female: 0, month }))
    );


    useEffect(() => {
        const newData = users.reduce((acc, user) => {
            const monthIndex = parseInt(user.registrationDate.substring(3, 5), 10) - 1;

            if (monthIndex >= 0 && monthIndex < 12) {
                if (user.gender === 'Male') {
                    acc[monthIndex].male += 1;
                } else if (user.gender === 'Female') {
                    acc[monthIndex].female += 1;
                }
            }

            return acc;
        }, months.map((month) => ({ male: 0, female: 0, month })));

        setBarChartData(newData);
    }, [users]);

    return (
        <div className="flex flex-wrap gap-2 pb-1">
            <div className="flex gap-2 flex-grow md:flex-col md:justify-evenly lg:flex-row lg:w-full">
                <Card title="App Users" customClass="text-center w-full">
                    {users.length}
                </Card>
                <Card title="Income" customClass="text-center w-full">
                    900$
                </Card>
                <Card title="Messages" customClass="text-center w-full">
                    3
                </Card>
            </div>

            <div className=" flex flex-grow lg:flex-col">
                <Card customClass="w-full">
                    <Calendar />
                </Card>
            </div>

            <div className="flex md:flex-col flex-grow">
                <Card title="Gender division" customClass="text-center items-center flex flex-col w-full">
                    <Chart
                        chartType="PieChart"
                        data={[
                            ["User gender", "Amount"],
                            ["Male", users.filter(u => u.gender === "Male").length],
                            ["Female", users.filter(u => u.gender === "Female").length],
                        ]}
                        options={{
                            legend: {
                                position: "right",
                                alignment: "center",
                                textStyle: {
                                    color: darkMode ? "white" : "black",
                                    fontSize: 14,
                                },
                            },
                            colors: ["skyBlue", "pink"],
                            backgroundColor: 'transparent'
                        }}
                        height={250}
                    />
                </Card>
            </div>

            <div className="flex md:flex-col w-full ">
                <Card title="Registers by month" customClass="w-full h-[270px] text-center">
                    <ResponsiveContainer className="py-3">
                        <BarChart data={barChartData}>
                            <XAxis dataKey="month" stroke={`${darkMode ? 'white' : 'black'}`} />
                            <YAxis stroke={`${darkMode ? 'white' : 'black'}`} />
                            <Tooltip contentStyle={{
                                backgroundColor: darkMode ? "#666" : "white",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }} />
                            <Legend />
                            <Bar dataKey="male" fill="skyBlue" />
                            <Bar dataKey="female" fill="pink" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            <ToastContainer />
        </div >
    )
}

export default AdminDashboard