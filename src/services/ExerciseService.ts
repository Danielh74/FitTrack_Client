import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

type newExercise = {
    name?: string;
    muscleGroupName?: string;
    videoFile?: File;
}

const getAllExercises = () => {
    return axios.get(`${baseUrl}/exercises/admin`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

const createExercise = (data: newExercise) => {
    return axios.post(`${baseUrl}/exercises/admin`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

const deleteExercise = (id: number) => {
    return axios.delete(`${baseUrl}/exercises/admin/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

const getAllMuscleGroups = () => {
    return axios.get(`${baseUrl}/muscleGroups/admin`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

export const exerciseService = { getAllExercises, getAllMuscleGroups, createExercise, deleteExercise };