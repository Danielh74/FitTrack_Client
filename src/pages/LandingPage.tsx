import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";

function LandingPage() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <ToastContainer />
        </div>
    );
}

export default LandingPage;