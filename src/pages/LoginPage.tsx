import { useState } from "react"
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { auth } from "../services/UserService";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import "../styles/background.scss";
import "../styles/Form.scss";
import "../styles/Card.scss";
import "/src/styles/Toast.scss";
import { handleApiErrors } from "../utils/Helpers";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"),
    password: Yup.string().required().min(8).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, "Password must have minimum 8 characters and contain at least one uppercase letter, one lowercase character and one special character.")
});

type LoginInputs = Yup.InferType<typeof validationSchema>;

const LoginPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { handleLogin } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        setIsLoading(true);

        auth.login(data).then((response) => {
            toast.success("Login Successful");
            handleLogin(response.token, response.user);
        }).catch((error) => {
            const errorMsg = handleApiErrors(error);
            toast.error(errorMsg);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="login-bg">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row w-1/2 justify-center">
                <Card title="Log-in" customClass="auth-card w-full">
                    <div className="flex flex-col items-start my-2">
                        <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            id="email"
                            placeholder="name@company.com"
                            className="auth-field focus:ring-2 focus:ring-customBlue dark:focus:ring-customGold focus:border-none" />
                        {errors.email && <div className="text-red-500 dark:text-customRed text-sm">{errors.email.message}</div>}
                    </div>
                    <div className="flex flex-col items-start my-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Password</label>
                        <input
                            {...register("password")}
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="auth-field focus:ring-2 focus:ring-customBlue dark:focus:ring-customGold focus:border-none" />
                        {errors.password && <div className="text-red-500 dark:text-customRed text-sm">{errors.password.message}</div>}
                    </div>
                    {isLoading ? <Loader />
                        : <button type="submit" className="w-full mt-4 save-button">Login</button>}
                    <div className="flex flex-wrap gap-1 text-sm font-medium text-black pt-3 ps-1 dark:text-white">
                        <span>Not registered?</span> <Link to="/register" className="text-blue-700 hover:underline dark:text-customGold">Create account</Link>
                    </div>
                </Card>
            </form>
        </div>
    )
}

export default LoginPage