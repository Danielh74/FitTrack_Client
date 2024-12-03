import { useContext } from 'react'
import { AdminContext } from '../contexts/AdminContext'

const useAdmin = () => {
    const admin = useContext(AdminContext);

    if (!admin) {
        throw new Error("useAdmin must be used within an AdminProvider")
    }
    return admin
};

export default useAdmin