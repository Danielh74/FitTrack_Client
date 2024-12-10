import { SubmitHandler, useForm } from "react-hook-form"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "../../components/Card";
import { healthDecService } from "../../services/HealthDeclarationService";
import { useNavigate } from "react-router-dom";
import { handleApiErrors } from "../../utils/Helpers";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";

const validationSchema = Yup.object({
    heartDisease: Yup.boolean().required("This field is required"),
    chestPainInRest: Yup.boolean().required("This field is required"),
    chestPainInDaily: Yup.boolean().required("This field is required"),
    chestPainInActivity: Yup.boolean().required("This field is required"),
    dizzy: Yup.boolean().required("This field is required"),
    lostConsciousness: Yup.boolean().required("This field is required"),
    asthmaTreatment: Yup.boolean().required("This field is required"),
    shortBreath: Yup.boolean().required("This field is required"),
    familyDeathHeartDisease: Yup.boolean().required("This field is required"),
    familySuddenEarlyAgeDeath: Yup.boolean().required("This field is required"),
    trainUnderSupervision: Yup.boolean().required("This field is required"),
    chronicIllness: Yup.boolean().required("This field is required"),
    isPregnant: Yup.boolean().required("This field is required"),
});

type FormInput = Yup.InferType<typeof validationSchema>;

const HealthDeclarationPage = () => {
    const { reloadUser, currentUser } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        heartDisease: null,
        chestPainInRest: null,
        chestPainInDaily: null,
        chestPainInActivity: null,
        dizzy: null,
        lostConsciousness: null,
        asthmaTreatment: null,
        shortBreath: null,
        familyDeathHeartDisease: null,
        familySuddenEarlyAgeDeath: null,
        trainUnderSupervision: null,
        chronicIllness: null,
        isPregnant: null,
    }
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<FormInput> = (data) => {
        setIsLoading(true);
        healthDecService.createHealthDec(data).then((response) => {
            reloadUser({ ...currentUser, healthDeclarationId: response.data.id })
            navigate('/user/dashboard', { replace: true, state: { toastMessage: "Health declaration filled seuccessfully!" } });
        }).catch((error) => {
            const errorMsg = handleApiErrors(error);
            toast.error(errorMsg);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className="flex justify-center">
            <Card title="Health Declaration">
                {isLoading &&
                    <div className="absolute inset-0 flex justify-center items-center z-10">
                        <Loader />
                    </div>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex-col items-center my-1">
                        <span className="p-1">Do you suffer from heart disease?</span>
                        <span className="inline-flex items-center gap-1">
                            <input type="radio" id="hd-yes" {...register("heartDisease")} value='true' />
                            <label>yes</label>
                            <input type="radio" id="hd-no" {...register("heartDisease")} value='false' />
                            <label>no</label>
                        </span>
                        {errors.heartDisease && <div className="dark:text-customRed text-red-500 text-sm flex">{errors.heartDisease.message}</div>}
                    </div>

                    <div className="flex-col items-center my-1">
                        <span className="p-1">Do you suffer from chest pain while in rest?</span>
                        <span className="inline-flex items-center gap-1">
                            <input type="radio" id="hd-yes" {...register("chestPainInRest")} value='true' />
                            <label>yes</label>
                            <input type="radio" id="hd-no" {...register("chestPainInRest")} value='false' />
                            <label>no</label>
                        </span>
                        {errors.chestPainInRest && <div className="dark:text-customRed text-red-500 text-sm">{errors.chestPainInRest.message}</div>}
                    </div>

                    <div className="flex-col items-center my-1">
                        <span className="p-1">Do you suffer from chest pain in daily routines?</span>
                        <span className="inline-flex items-center gap-1">
                            <input type="radio" id="hd-yes" {...register("chestPainInDaily")} value='true' />
                            <label>yes</label>
                            <input type="radio" id="hd-no" {...register("chestPainInDaily")} value='false' />
                            <label>no</label>
                        </span>
                        {errors.chestPainInDaily && <div className="dark:text-customRed text-red-500 text-sm">{errors.chestPainInDaily.message}</div>}
                    </div>

                    <div className="flex-col items-center my-1">
                        <span className="p-1">Do you suffer from chest pain while working out?</span>
                        <span className="inline-flex items-center gap-1">
                            <input type="radio" id="hd-yes" {...register("chestPainInActivity")} value='true' />
                            <label>yes</label>
                            <input type="radio" id="hd-no" {...register("chestPainInActivity")} value='false' />
                            <label>no</label>
                        </span>
                        {errors.chestPainInActivity && <div className="dark:text-customRed text-red-500 text-sm">{errors.chestPainInActivity.message}</div>}
                    </div>

                    <div className="flex-col items-center my-1">
                        <span className="p-1">Have you lost balance due to dizziness in the past year?</span>
                        <span className="inline-flex items-center gap-1">
                            <input type="radio" id="hd-yes" {...register("dizzy")} value='true' />
                            <label>yes</label>
                            <input type="radio" id="hd-no" {...register("dizzy")} value='false' />
                            <label>no</label>
                        </span>
                        {errors.dizzy && <div className="dark:text-customRed text-red-500 text-sm">{errors.dizzy.message}</div>}
                    </div>

                    <div className="flex-col items-center my-1">
                        <span className="p-1">Have you lost consciousness in the past year?</span>
                        <span className="inline-flex items-center gap-1">
                            <input type="radio" id="hd-yes" {...register("lostConsciousness")} value='true' />
                            <label>yes</label>
                            <input type="radio" id="hd-no" {...register("lostConsciousness")} value='false' />
                            <label>no</label>
                        </span>
                        {errors.lostConsciousness && <div className="dark:text-customRed text-red-500 text-sm">{errors.lostConsciousness.message}</div>}
                    </div>

                    <div className="flex-col items-center my-1">
                        <span className="p-1">Have you got treatment for asthma in the past 3 months?</span>
                        <span className="inline-flex items-center gap-1">
                            <input type="radio" id="hd-yes" {...register("asthmaTreatment")} value='true' />
                            <label>yes</label>
                            <input type="radio" id="hd-no" {...register("asthmaTreatment")} value='false' />
                            <label>no</label>
                        </span>
                        {errors.asthmaTreatment && <div className="dark:text-customRed text-red-500 text-sm">{errors.asthmaTreatment.message}</div>}
                    </div>

                    <div className="flex-col items-center my-1">
                        <span className="p-1">Have you suffered from short breath in the past 3 months?</span>
                        <span className="inline-flex items-center gap-1">
                            <input type="radio" id="hd-yes" {...register("shortBreath")} value='true' />
                            <label>yes</label>
                            <input type="radio" id="hd-no" {...register("shortBreath")} value='false' />
                            <label>no</label>
                        </span>
                        {errors.shortBreath && <div className="dark:text-customRed text-red-500 text-sm">{errors.shortBreath.message}</div>}
                    </div>

                    <div className="flex-col items-center my-1">
                        <span className="p-1">Did one of your close family members died from a heart disease?</span>
                        <span className="inline-flex items-center gap-1">
                            <input type="radio" id="hd-yes" {...register("familyDeathHeartDisease")} value='true' />
                            <label>yes</label>
                            <input type="radio" id="hd-no" {...register("familyDeathHeartDisease")} value='false' />
                            <label>no</label>
                        </span>
                        {errors.familyDeathHeartDisease && <div className="dark:text-customRed text-red-500 text-sm">{errors.familyDeathHeartDisease.message}</div>}
                    </div>

                    <div className="flex-col items-center my-1">
                        <span className="p-1">Did one of your close family members died suddenly at a early age?</span>
                        <span className="inline-flex items-center gap-1">
                            <input type="radio" id="hd-yes" {...register("familySuddenEarlyAgeDeath")} value='true' />
                            <label>yes</label>
                            <input type="radio" id="hd-no" {...register("familySuddenEarlyAgeDeath")} value='false' />
                            <label>no</label>
                        </span>
                        {errors.familySuddenEarlyAgeDeath && <div className="dark:text-customRed text-red-500 text-sm">{errors.familySuddenEarlyAgeDeath.message}</div>}
                    </div>

                    <div className="flex-col items-center my-1">
                        <span className="p-1">Did your doctor tell you in the past 5 years to train under supervision?</span>
                        <span className="inline-flex items-center gap-1">
                            <input type="radio" id="hd-yes" {...register("trainUnderSupervision")} value='true' />
                            <label>yes</label>
                            <input type="radio" id="hd-no" {...register("trainUnderSupervision")} value='false' />
                            <label>no</label>
                        </span>
                        {errors.trainUnderSupervision && <div className="dark:text-customRed text-red-500 text-sm">{errors.trainUnderSupervision.message}</div>}
                    </div>

                    <div className="flex-col items-center my-1">
                        <span className="p-1">Do you suffer from chronic illness?</span>
                        <span className="inline-flex items-center gap-1">
                            <input type="radio" id="hd-yes" {...register("chronicIllness")} value='true' />
                            <label>yes</label>
                            <input type="radio" id="hd-no" {...register("chronicIllness")} value='false' />
                            <label>no</label>
                        </span>
                        {errors.chronicIllness && <div className="dark:text-customRed text-red-500 text-sm">{errors.chronicIllness.message}</div>}
                    </div>

                    <div className="flex-col items-center my-1">
                        <span className="p-1">Are you pregnant?</span>
                        <span className="inline-flex items-center gap-1">
                            <input type="radio" id="hd-yes" {...register("isPregnant")} value='true' />
                            <label>yes</label>
                            <input type="radio" id="hd-no" {...register("isPregnant")} value='false' />
                            <label>no</label>
                        </span>
                        {errors.isPregnant && <div className="dark:text-customRed text-red-500 text-sm">{errors.isPregnant.message}</div>}
                    </div>
                    <button className="save-button px-3 mt-2">submit</button>
                </form>
            </Card>
            <ToastContainer />
        </div>
    )
}

export default HealthDeclarationPage