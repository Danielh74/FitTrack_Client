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


const getAllMenus = () => {
    return axios.get(`${baseUrl}/menus/admin`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

const getMenu = (userId: number) => {
    return axios.get(`${baseUrl}/menus/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

const createMenu = (id: number) => {
    return axios.post(`${baseUrl}/menus/admin`, { userId: id }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

const deleteMenu = (id: number) => {
    return axios.delete(`${baseUrl}/menus/admin/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

const createMeal = (meal: CreateMeal) => {
    return axios.post(`${baseUrl}/meals/admin`, meal, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

const updateMeal = (id: number, meal: UpdateMeal) => {
    return axios.put(`${baseUrl}/meals/${id}`, meal, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

const deleteMeal = (id: number) => {
    return axios.delete(`${baseUrl}/meals/admin/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};



export const menuService = { getAllMenus, getMenu, createMenu, deleteMenu, createMeal, updateMeal, deleteMeal };