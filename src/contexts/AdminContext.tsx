import { createContext, ReactNode, useEffect, useState } from "react";
import { UsersList } from "../models/User";
import { auth } from "../services/UserService";
import { handleApiErrors } from "../utils/Helpers";
import { dialogs } from "../dialogs/Dialogs";
import Loader from "../components/Loader";

interface AdminContextType {
    users: UsersList[] | null;
    reloadUsers: (users: UsersList[]) => void;
}

const initialValues: AdminContextType = {
    users: [],
    reloadUsers: () => { }
}

const AdminContext = createContext(initialValues);

function AdminProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<UsersList[]>([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const fetchAllUsers = () => {
            setIsLoading(true);
            auth.getAllUsers().then((response) => {
                setUsers(response);
            }).catch((error) => {
                const errorMsg = handleApiErrors(error);
                dialogs.errorAlert(errorMsg);
                setUsers([]);
            }).finally(() => {
                setIsLoading(false);
            });
        }
        fetchAllUsers();

        return () => {
            setUsers(null);
        };
    }, []);

    const reloadUsers = (updatedUsers: UsersList[]) => {
        setUsers(updatedUsers);
    }

    if (isLoading)
        return <div className="flex justify-center items-center h-screen w-screen">
            <Loader />
        </div>

    return <AdminContext.Provider value={{ users, reloadUsers }}>{children}</AdminContext.Provider>
};

export { AdminContext, AdminProvider }