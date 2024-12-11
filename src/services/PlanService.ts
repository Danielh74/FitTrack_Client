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

const updatePlanComplete = ({ id, name, isCompleted }: UpdatedPlanProps) => {
    return axios.put(`${baseUrl}/plans/${id}`,
        { name: name, isCompleted: isCompleted },
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

const updatePlanExercise = ({ id, orderInPlan, reps, sets, previousWeight, currentWeight }: UpdatedPlanExercise) => {
    return axios.put(`${baseUrl}/plandetails/${id}`,
        {
            orderInPlan: orderInPlan,
            reps: reps,
            sets: sets,
            previousWeight: previousWeight,
            currentWeight: currentWeight
        },
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

const createPlanExercise = (planExercise: CreatePlanExercise) => {
    return axios.post(`${baseUrl}/plandetails/admin`, planExercise,
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

const deletePlanExercise = (id: number) => {
    return axios.delete(`${baseUrl}/plandetails/admin/${id}`,
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

export const planService = { updatePlanComplete, getPlan, deletePlan, updatePlanExercise, createPlanExercise, deletePlanExercise, createPlan }