import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface Props {
    children: ReactNode
}

export const AuthRoute = ({ children }: Props) => {
    const { isAdmin, currentUser } = useAuth();

    if (currentUser) {
        if (isAdmin) {
            return <Navigate to="/admin/dashboard" />;
        }
        return children;
    }

    return <Navigate to="/login" />
};

export const NotAuthRoute = ({ children }: Props) => {
    const { currentUser } = useAuth();

    return !currentUser ? children : <Navigate to="/user/dashboard" />;
};

export const AdminRoute = ({ children }: Props) => {
    const { currentUser, isAdmin } = useAuth();
    if (currentUser && isAdmin) {
        return children;
    }

    if (currentUser && !isAdmin) {
        return <Navigate to="/user/dashboard" />
    }

    return <Navigate to="/login" />
};
