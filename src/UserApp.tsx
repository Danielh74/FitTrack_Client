import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";

function UserApp() {

    return (
        <>
            <Navbar />
            <div className='pt-16 px-3'>
                <Outlet />
            </div>
        </>
    );

}

export default UserApp