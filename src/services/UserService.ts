import axios from "axios";
import { TokenPayload } from "../models/User";
import { jwtDecode } from "jwt-decode";

type updatedUserProps = {
    city: string,
    age: number,
    goal: string,
    height: number,
    neckCircumference: number,
    pecsCircumference: number,
    armCircumference: number,
    waistCircumference: number,
    abdominalCircumference: number,
    thighsCircumference: number,
    hipsCircumference: number,
    weight: number
}

type LoginProps = {
    email?: string;
    password?: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL + "/accounts";

const register = (registerInputs) =>
    axios.post(`${baseUrl}/register`, registerInputs);

const login = ({ email, password }: LoginProps) =>
    axios.post(`${baseUrl}/login`, { email, password });

const getUserInfo = (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found. User is not authenticated.");
    }
    return axios.get(`${baseUrl}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getCurrentUser = (token: string) => {
    const payload: TokenPayload = jwtDecode<TokenPayload>(token);
    return axios.get(`${baseUrl}/${payload.nameid}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getAllUsers = () =>
    axios.get(`${baseUrl}/admin`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

const updateCurrentUser = (updatedUser: updatedUserProps) =>
    axios.put(`${baseUrl}`, updatedUser, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

const deleteUser = (userId: number) =>
    axios.delete(`${baseUrl}/admin/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

export const auth = { register, login, getUserInfo, getCurrentUser, getAllUsers, updateCurrentUser, deleteUser }


