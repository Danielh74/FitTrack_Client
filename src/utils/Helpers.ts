import { dialogs } from './../dialogs/Dialogs';
import axios from "axios";

export const handleApiErrors = (error) => {

    if (axios.isAxiosError(error)) {
        if (error.response) {
            if ([400, 401, 404].includes(error.response.status)) {
                return (error.response.data);
            }
            if (error.response.status === 403) {
                return ("Forbidden from accessing the data");
            }
            if (error.response.status === 500) {
                return ("Internal server error");
            }
        }
        if (error.request) {
            return ("An error has occurred while sending the request");
        }
        return (error.message || "An error occurred");
    }
    return ("An unexpected error occurred");
};

export const deleteItem = (item: string, deleteFunc: (id?: number) => void, id?: number) => {
    const message = `The ${item} will be erased!`;
    dialogs.deleteAlert(message, deleteFunc, id)
};

