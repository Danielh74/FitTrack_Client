import '/src/styles/navbar.scss';
import { HiDotsHorizontal } from "react-icons/hi";
import useAdmin from "../../hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Dropdown } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { auth } from "../../services/UserService";
import { useEffect, useState } from "react";
import { deleteItem, handleApiErrors } from "../../utils/Helpers";
import Loader from "../../components/Loader";
import { UsersList } from "../../models/User";
import "/src/styles/Toast.scss";

function Users() {
    const { users, reloadUsers } = useAdmin();
    const navigate = useNavigate();
    const [usersList, setUsersList] = useState<UsersList[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setUsersList(users);
    }, [users]);

    const handleUserDelete = (userId: number) => {
        setIsLoading(true);
        auth.deleteUser(userId).then((response) => {
            toast.success(response.data);
            const updatedList = usersList.filter(user => user.id !== userId);
            reloadUsers(updatedList);
        }).catch((error) => {
            const errorMsg = handleApiErrors(error);
            toast.error(errorMsg);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="relative">
            {users ? (
                <div className="overflow-x-auto w-full rounded-md border mt-3 dark:border-black border-gray-300 shadow-md">
                    {isLoading && (
                        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
                            <Loader />
                        </div>
                    )}
                    <table className="text-sm w-full text-center font-medium dark:text-white">
                        <thead className="text-xs bg-gray-200 dark:bg-dropDownBg uppercase border-b">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Full name</th>
                                <th className="px-4 py-3">Gender</th>
                                <th className="px-4 py-3">Age</th>
                                <th className="px-4 py-3">City</th>
                                <th className="px-4 py-3">Filled health declaration</th>
                                <th className="px-4 py-3">Registered at</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((user) => (
                                <tr
                                    key={user.id}
                                    className="odd:bg-white odd:dark:bg-mediumBg even:bg-gray-100 even:dark:bg-darkBg border-t dark:border-gray-700"
                                >
                                    <td className="px-4 py-3">{user.id}</td>
                                    <td className="px-4 py-3">
                                        {user.firstName} {user.lastName}
                                    </td>
                                    <td className="px-4 py-3">{user.gender}</td>
                                    <td className="px-4 py-3">{user.age}</td>
                                    <td className="px-4 py-3">{user.city}</td>
                                    <td className="px-4 py-3">{user.healthDeclarationId ? 'Yes' : 'No'}</td>
                                    <td className="px-4 py-3">{user.registrationDate}</td>
                                    <td>
                                        <Dropdown className="dark:bg-dropDownBg" dismissOnClick={true} renderTrigger={() => (
                                            <button className="hover:text-lg transition-all duration-75">
                                                <HiDotsHorizontal />
                                            </button>
                                        )}>
                                            <Dropdown.Item
                                                icon={HiEye}
                                                className="dropdown-item"
                                                onClick={() => navigate(`/admin/user/${user.id}`)}
                                            >
                                                View
                                            </Dropdown.Item>
                                            {user.id !== 1 && (
                                                <>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item
                                                        className="dropdown-logout"
                                                        icon={MdDelete}
                                                        onClick={() => deleteItem("user", () => handleUserDelete(user.id))}
                                                    >
                                                        Delete
                                                    </Dropdown.Item>
                                                </>
                                            )}
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center mt-6">No users are currently registered in the app.</p>
            )
            }
            <ToastContainer />
        </div >
    );
};

export default Users;