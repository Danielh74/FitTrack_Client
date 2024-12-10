import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { auth } from "../services/UserService";
import Card from "../components/Card";
import { dialogs } from "../dialogs/Dialogs";
import Loader from "../components/Loader";
import { handleApiErrors } from "../utils/Helpers";
import "../styles/Card.scss";
import "/src/styles/Toast.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import TermsAndConditionsModal from "../Modals/TermsAndConditionsModal";

const validationSchema = Yup.object({
    firstName: Yup.string().required().min(2, "First name has to be at least 2 characters"),
    lastName: Yup.string().required().min(2, "Last name has to be at least 2 characters"),
    age: Yup.number().required().positive().integer("Age must be a whole number").max(120, "Age cannot exceed 120").typeError("Age must be a number"),
    gender: Yup.string().required().min(3),
    goal: Yup.string().required().min(3),
    email: Yup.string().email("Invalid email").required("Email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"),
    password: Yup.string().required().min(8).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, "Password must have minimum 8 characters and contain at least one uppercase letter, one lowercase character and one special character."),
    validatePassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
    agreedToTerms: Yup.boolean().required().oneOf([true], "You must agree to terms to continue")
});

type RegisterInputs = Yup.InferType<typeof validationSchema>;

function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        firstName: "",
        lastName: "",
        age: 1,
        gender: "",
        goal: "",
        email: "",
        password: "",
        validatePassword: "",
        agreedToTerms: false
    };

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
        setIsLoading(true);

        auth.register(data).then((response) => {
            if (response.status === 200) {
                dialogs.SuccessAlert("Registration Successful");
                navigate("/login");
            }
        }).catch((error) => {
            const errorMsg = handleApiErrors(error)
            toast.error(errorMsg);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="register-bg">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row justify-center mt-14 w-full">
                <Card title="Create an account" customClass="auth-card w-full">
                    <div className="flex flex-row">
                        <div className="flex flex-col gap-2 w-1/2 me-2 text-lg my-2">
                            <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="firstName">First Name</label>
                            <input
                                {...register("firstName")}
                                id="firstName"
                                placeholder="John"
                                className="auth-field" />
                            {errors.firstName && <div className="text-red-500 dark:text-customRed text-sm">{errors.firstName.message}</div>}
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 ms-2 text-lg my-2">
                            <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="lastName">Last Name</label>
                            <input
                                {...register("lastName")}
                                id="lastName"
                                placeholder="Doe"
                                className="auth-field" />
                            {errors.lastName && <div className="text-red-500 dark:text-customRed text-sm">{errors.lastName.message}</div>}
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col gap-2 w-1/2 text-lg my-2">
                            <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="age">Age</label>
                            <input
                                {...register("age")}
                                type="number"
                                id="age"
                                placeholder="18"
                                className="auth-field" />
                            {errors.age && <div className="text-red-500 dark:text-customRed text-sm">{errors.age.message}</div>}
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 ms-4 text-lg my-2">
                            <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="gender">Gender</label>
                            <select
                                {...register("gender")}
                                id="gender"
                                className="auth-field">
                                <option value="" className="dark:bg-dropDownBg text-gray-500">--Select gender--</option>
                                <option value="Male" className="dark:bg-dropDownBg dark:text-white text-black">Male</option>
                                <option value="Female" className=" dark:bg-dropDownBg dark:text-white text-black">Female</option>
                            </select>
                            {errors.gender && <div className="text-red-500 dark:text-customRed text-sm">{errors.gender.message}</div>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 items-start my-2">
                        <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="goal">Goal</label>
                        <select
                            {...register("goal")}
                            id="goal"
                            className="auth-field">
                            <option value="" className="dark:bg-dropDownBg text-gray-500" >--Select goal--</option>
                            <option value="Build Mass" className="dark:bg-dropDownBg dark:text-white text-black">Build Mass</option>
                            <option value="toning" className="dark:bg-dropDownBg dark:text-white text-black">toning</option>
                        </select>
                        {errors.goal && <div className="text-red-500 dark:text-customRed text-sm">{errors.goal.message}</div>}
                    </div>
                    <div className="flex flex-col gap-2 items-start my-2">
                        <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@company.com"
                            className="auth-field" />
                        {errors.email && <div className="text-red-500 dark:text-customRed text-sm">{errors.email.message}</div>}
                    </div>
                    <div className="flex flex-col gap-2 items-start my-2">
                        <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Password</label>
                        <input
                            {...register("password")}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="auth-field" />
                        {errors.password && <div className="text-red-500 dark:text-customRed text-sm">{errors.password.message}</div>}
                    </div>
                    <div className="flex flex-col gap-2 items-start my-2">
                        <label htmlFor="validatePassword" className="text-sm font-medium text-gray-900 dark:text-white">Validate Password</label>
                        <input
                            {...register("validatePassword")}
                            id="validatePassword"
                            name="validatePassword"
                            type="password"
                            placeholder="••••••••"
                            className="auth-field" />
                        {errors.validatePassword && <div className="text-red-500 dark:text-customRed text-sm">{errors.validatePassword.message}</div>}
                    </div>
                    <div className="flex flex-col items-start my-3">
                        <div className="flex flex-row">
                            <div className="flex flex-col items-center h-5">
                                <input
                                    {...register("agreedToTerms")}
                                    type="checkbox"
                                    name="agreedToTerms"
                                    className="w-4 h-4 border dark:checked:bg-customGold border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-300 dark:bg-darkBg dark:border-mediumBg dark:focus:ring-customGold dark:ring-offset-gray-800" />
                            </div>
                            <div className="ml-3 text-sm flex flex-row gap-1">
                                <label className="font-medium text-black dark:text-white">I accept the</label>
                                <button onClick={() => setShowModal(true)} className="font-medium text-blue-600 hover:underline dark:text-customGold"> Terms and Conditions</button>
                            </div>
                        </div>
                        {errors.agreedToTerms && <div className="text-red-500 dark:text-customRed text-sm flex flex-row">{errors.agreedToTerms.message}</div>}
                    </div>
                    {isLoading ? <Loader />
                        : <button type="submit" className="w-full save-button">Register</button>}
                    <div className="text-sm font-medium text-black pt-3 ps-1 dark:text-white">
                        Already registered? <Link to="/login" className="text-blue-700 hover:underline dark:text-customGold">Log-in</Link>
                    </div>
                </Card>
            </form>
            <TermsAndConditionsModal show={showModal} onClose={() => { setShowModal(false) }} />
        </div>
    )
}

export default RegisterPage