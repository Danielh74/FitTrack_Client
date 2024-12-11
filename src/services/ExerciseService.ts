import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

type newExercise = {
    name?: string;
    muscleGroupName?: string;
    videoFile?: File;
}

const getAllExercises = () =>
    axios.get(`${baseUrl}/exercises/admin`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })

const createExercise = (data: newExercise) =>
    axios.post(`${baseUrl}/exercises/admin`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
        },
    });

const deleteExercise = (id: number) =>
    axios.delete(`${baseUrl}/exercises/admin/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

const getAllMuscleGroups = () =>
    axios.get(`${baseUrl}/muscleGroups/admin`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

export const exerciseService = { getAllExercises, getAllMuscleGroups, createExercise, deleteExercise };