import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

type newHealthDec = {
    heartDisease?: boolean,
    chestPainInRest?: boolean,
    chestPainInDaily?: boolean,
    chestPainInActivity?: boolean,
    dizzy?: boolean,
    lostConsciousness?: boolean,
    asthmaTreatment?: boolean,
    shortBreath?: boolean,
    familyDeathHeartDisease?: boolean,
    familySuddenEarlyAgeDeath?: boolean,
    trainUnderSupervision?: boolean,
    chronicIllness?: boolean,
    isPregnant?: boolean,
}

const getHealthDecByUserId = (userId: number) => {
    return axios.get(`${baseUrl}/healthDeclarations/admin/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

const createHealthDec = (data: newHealthDec) => {
    return axios.post(`${baseUrl}/healthDeclarations/admin`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

const deleteHealthDec = (id: number) => {
    return axios.delete(`${baseUrl}/healthDeclarations/admin/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

export const healthDecService = { getHealthDecByUserId, createHealthDec, deleteHealthDec };