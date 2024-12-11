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

const getHealthDecByUserId = (userId: number) =>
    axios.get(`${baseUrl}/healthDeclarations/admin/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

const createHealthDec = (data: newHealthDec) =>
    axios.post(`${baseUrl}/healthDeclarations/admin`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    });

const deleteHealthDec = (id: number) =>
    axios.delete(`${baseUrl}/healthDeclarations/admin/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

export const healthDecService = { getHealthDecByUserId, createHealthDec, deleteHealthDec };