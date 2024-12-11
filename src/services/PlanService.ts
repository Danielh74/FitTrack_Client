import axios from "axios";

type UpdatedPlanProps = {
    id: number,
    name: string,
    isCompleted: boolean,
}

type UpdatedPlanExercise = {
    id?: number
    orderInPlan?: number
    reps?: number
    sets?: number
    currentWeight?: number
    previousWeight?: number
};

type CreatePlanExercise = {
    exerciseId: number
    planId: number
    orderInPlan: number
    reps: number
    sets: number
};

const baseUrl = import.meta.env.VITE_BASE_URL;

const getPlan = (planId: number) => {
    return axios.get(`${baseUrl}/plans/admin/${planId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

const deletePlan = (planId: number) => {
    return axios.delete(`${baseUrl}/plans/admin/${planId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

const createPlan = (userId: number, name: string) => {
    return axios.post(`${baseUrl}/plans/admin`,
        { userId: userId, name: name },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            return response;
        }).catch((error) => {
            throw error;
        });
};

const updatePlanComplete = (updatedPlan: UpdatedPlanProps) =>
    axios.put(`${baseUrl}/plans/${updatedPlan.id}`, updatedPlan,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

const updatePlanExercise = (updatedPlanExercise: UpdatedPlanExercise) =>
    axios.put(`${baseUrl}/plandetails/${updatedPlanExercise.id}`, updatedPlanExercise,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

const createPlanExercise = (planExercise: CreatePlanExercise) =>
    axios.post(`${baseUrl}/plandetails/admin`, planExercise,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

const deletePlanExercise = (id: number) =>
    axios.delete(`${baseUrl}/plandetails/admin/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

export const planService = { updatePlanComplete, getPlan, deletePlan, updatePlanExercise, createPlanExercise, deletePlanExercise, createPlan }