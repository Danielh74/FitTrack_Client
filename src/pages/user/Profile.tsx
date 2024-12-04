import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import "/src/styles/Form.scss"
import { auth } from "../../services/UserService";
import { toast } from "react-toastify";
import { handleApiErrors } from "../../utils/Helpers";
import bodyImage from '/src/assets/body.png';
import Card from "../../components/Card";
import "/src/styles/Card.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GiBodyHeight, GiMuscularTorso, GiWeightScale } from "react-icons/gi";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "/src/styles/Toast.scss";

const validationSchema = yup.object({
    city: yup.string().min(2, "City must be at least 2 characters"),
    age: yup.number().integer().min(1).max(120).required("Age is required"),
    goal: yup.string().required(),
    height: yup.number().integer("Height is in cm and has to be a whole number").positive(),
    weight: yup.number().positive(),
    neckCircumference: yup.number().positive(),
    pecsCircumference: yup.number().positive(),
    armCircumference: yup.number().positive(),
    waistCircumference: yup.number().positive(),
    abdominalCircumference: yup.number().positive(),
    thighsCircumference: yup.number().positive(),
    hipsCircumference: yup.number().positive(),
});

type ProfileInputs = yup.InferType<typeof validationSchema>;

const Profile = () => {
    const { currentUser, reloadUser } = useAuth();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const initialValues = {
        city: currentUser.city,
        age: currentUser.age,
        goal: currentUser.goal,
        height: currentUser.height,
        neckCircumference: currentUser.neckCircumference,
        pecsCircumference: currentUser.pecsCircumference,
        armCircumference: currentUser.armCircumference,
        waistCircumference: currentUser.waistCircumference,
        abdominalCircumference: currentUser.abdominalCircumference,
        thighsCircumference: currentUser.thighsCircumference,
        hipsCircumference: currentUser.hipsCircumference,
        weight: currentUser.weight[currentUser.weight.length - 1]?.value ?? 0
    };

    const { register, handleSubmit } = useForm<ProfileInputs>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<ProfileInputs> = (data) => {
        const updatedValues = {
            city: data.city,
            age: data.age,
            goal: data.goal,
            height: data.height,
            weight: data.weight,
            neckCircumference: data.neckCircumference,
            pecsCircumference: data.pecsCircumference,
            armCircumference: data.armCircumference,
            waistCircumference: data.waistCircumference,
            abdominalCircumference: data.abdominalCircumference,
            hipsCircumference: data.hipsCircumference,
            thighsCircumference: data.thighsCircumference,
        };

        auth.updateCurrentUser(updatedValues).then((response) => {
            toast.success('Measurements updated successfully');
            console.log(response.data);
            reloadUser(response.data);
        }).catch((error) => {
            const errorMsg = handleApiErrors(error);
            toast.error(errorMsg)
        }).finally(() => {
            setIsDisabled(true);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="flex flex-col lg:flex-row lg:gap-3">
                    <section className="flex flex-col lg:w-1/2 gap-3">
                        <Card title="User info" customClass="profile-card h-1/2">
                            <h1 className="font-medium text-2xl text-center mb-4">
                                {currentUser.firstName + " " + currentUser.lastName}
                            </h1>
                            <main className="flex flex-col gap-7">
                                <div className="flex justify-evenly">
                                    <span>
                                        <label>Age:</label>
                                        <input
                                            {...register("age")}
                                            disabled={isDisabled}
                                            className='profile-field' />
                                    </span>
                                    <span>
                                        <label className="me-1">Gender:</label>
                                        {currentUser.gender}
                                    </span>
                                </div>
                                <div className="flex justify-around ">
                                    <span>
                                        <label>City: </label>
                                        <input
                                            {...register("city")}
                                            disabled={isDisabled}
                                            className='bg-transparent w-20 enabled:border-2 enabled:border-black enabled:rounded' />
                                    </span>
                                    <span>
                                        <label>Goal: </label>
                                        {isDisabled ?
                                            <input
                                                {...register("goal")}
                                                disabled
                                                className="bg-transparent w-24">
                                            </input>
                                            :
                                            <select
                                                {...register("goal")}
                                                className="profile-select focus:ring-2 focus:ring-customBlue dark:focus:ring-customGold focus:border-none">
                                                <option value="Build Mass" className="dark:bg-darkBg">Build Mass</option>
                                                <option value="toning" className=" dark:bg-darkBg">toning</option>
                                            </select>
                                        }
                                    </span>
                                </div>
                                <span className="flex justify-center gap-2">
                                    <div className="self-center">
                                        <GiMuscularTorso />
                                    </div>
                                    Body fat: {currentUser.bodyFatPrecentage === 0 ? "N/A" : currentUser.bodyFatPrecentage + '%'}
                                </span>
                            </main>
                        </Card>
                        <Card title="Account info" customClass="profile-card  h-1/2">
                            <article className="flex flex-col h-full">
                                <span>
                                    Email: {currentUser.email}
                                </span>
                            </article>
                        </Card>
                    </section>

                    <section className="flex flex-col lg:w-1/2 mt-5 lg:mt-0">
                        <Card title="Measurments" customClass="profile-card">
                            <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-center">
                                <div className="flex gap-4 sm:gap-0 flex-col">
                                    <span className="flex sm:mt-16 border-b-2 border-black">
                                        <label>Neck:</label>
                                        <input  {...register("neckCircumference")} disabled={isDisabled} className='profile-field' /> cm
                                    </span>
                                    <span className="flex sm:mt-9 border-b-2 border-black">
                                        <label>Arm:</label>
                                        <input  {...register("armCircumference")} disabled={isDisabled} className="profile-field" /> cm
                                    </span>
                                    <span className="flex sm:mt-6 border-b-2 border-black">
                                        <label>Abdominal:</label>
                                        <input  {...register("abdominalCircumference")} disabled={isDisabled} className="profile-field" /> cm
                                    </span>
                                    <span className="flex sm:mt-8 border-b-2 border-black">
                                        <label>Thighs:</label>
                                        <input  {...register("thighsCircumference")} disabled={isDisabled} className="profile-field" /> cm
                                    </span>
                                    <span className="flex sm:mt-32">
                                        <div className="pt-1 pr-1">
                                            <GiBodyHeight />
                                        </div>
                                        <label> Height:</label>
                                        <input  {...register("height")} disabled={isDisabled} className="profile-field" /> cm
                                    </span>
                                </div>
                                <div className="hidden sm:flex">
                                    <img src={bodyImage} alt="body" className="body-img" />
                                </div>
                                <div className="flex gap-4 sm:gap-0 flex-col">
                                    <span className="flex sm:mt-28 border-b-2 border-black">
                                        <label>Chest:</label>
                                        <input  {...register("pecsCircumference")} disabled={isDisabled} className="profile-field" /> cm
                                    </span>
                                    <span className="flex sm:mt-4 border-b-2 border-black">
                                        <label>Waist:</label>
                                        <input  {...register("waistCircumference")} disabled={isDisabled} className="profile-field" /> cm
                                    </span>
                                    <span className="flex sm:mt-4 border-b-2 border-black">
                                        <label>Hips:</label>
                                        <input  {...register("hipsCircumference")} disabled={isDisabled} className="profile-field" /> cm
                                    </span>
                                    <span className="flex sm:mt-40">
                                        <div className="pt-1 pr-1">
                                            <GiWeightScale />
                                        </div>
                                        <label>Weight</label>
                                        <input  {...register("weight")} disabled={isDisabled} className="profile-field" /> kg
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </section>
                </div>
                <div className="flex justify-center my-3">
                    {isDisabled && <button
                        className="save-button px-2"
                        type="button"
                        onClick={() => setIsDisabled(false)} >
                        Edit information
                    </button>}
                    {!isDisabled && <button
                        className="save-button px-2"
                        type="submit" >
                        Confirm
                    </button>
                    }
                </div>
            </form>
            <ToastContainer />
        </div>
    )
};

export default Profile;