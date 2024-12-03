import { Outlet } from 'react-router-dom'
import './App.css'
import { AdminProvider } from './contexts/AdminContext';
import Navbar from './components/Navbar';

function AdminApp() {

    return (
        <AdminProvider>
            <Navbar />
            <div className='pt-16 px-3'>
                <Outlet />
            </div>
        </AdminProvider>
    );
};

export default AdminApp;
