import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

type CreateMeal = {
    menuId?: number;
    name?: string;
    proteinPoints?: number;
    carbsPoints?: number;
    fatsPoints?: number;
    order?: number;
}

type UpdateMeal = {
    proteinPoints?: number;
    carbsPoints?: number;
    fatsPoints?: number;
    isCompleted?: boolean;
}


const getAllMenus = () =>
    axios.get(`${baseUrl}/menus/admin`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

const getMenu = (userId: number) =>
    axios.get(`${baseUrl}/menus/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

const createMenu = (id: number) =>
    axios.post(`${baseUrl}/menus/admin`, { userId: id }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

const deleteMenu = (id: number) =>
    axios.delete(`${baseUrl}/menus/admin/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

const createMeal = (meal: CreateMeal) =>
    axios.post(`${baseUrl}/meals/admin`, meal, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

const updateMeal = (id: number, meal: UpdateMeal) =>
    axios.put(`${baseUrl}/meals/${id}`, meal, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

const deleteMeal = (id: number) =>
    axios.delete(`${baseUrl}/meals/admin/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });



export const menuService = { getAllMenus, getMenu, createMenu, deleteMenu, createMeal, updateMeal, deleteMeal };