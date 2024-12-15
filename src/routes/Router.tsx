import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { AdminRoute, AuthRoute, NotAuthRoute } from "./ProtectedRoutes";
import Dashboard from "../pages/user/Dashboard";
import Plans from "../pages/user/Plans";
import Profile from "../pages/user/Profile";
import MenuPage from "../pages/user/MenuPage";
import NotFound from "../pages/NotFound";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminApp from "../AdminApp";
import Users from "../pages/admin/Users";
import UserPage from "../pages/admin/UserPage";
import LandingPage from "../pages/LandingPage";
import UserApp from "../UserApp";
import UserPlan from "../pages/admin/UserPlan";
import UserMenu from "../pages/admin/UserMenu";
import ExercisesManagement from "../pages/admin/ExercisesManagement";
import HealthDeclarationPage from "../pages/user/HealthDeclarationPage";
import AboutPage from "../pages/AboutPage";

export const router = createBrowserRouter([
    {
        path: "", element: <App />, children: [
            {
                path: "/", element: <NotAuthRoute><LandingPage /></NotAuthRoute>, children: [
                    { path: "/", element: <Home /> },
                    { path: "/about", element: <AboutPage /> },
                    { path: "/login", element: <LoginPage /> },
                    { path: "/register", element: <RegisterPage /> },
                ]
            },
            {
                path: "/user", element: <AuthRoute><UserApp /></AuthRoute>, children: [
                    { path: "dashboard", element: <Dashboard /> },
                    { path: "plans", element: <Plans /> },
                    { path: "profile", element: <Profile /> },
                    { path: "menu", element: <MenuPage /> },
                    { path: "healthDeclaration", element: <HealthDeclarationPage /> },
                ]
            },
            {
                path: "/admin", element: <AdminRoute><AdminApp /></AdminRoute>, children: [
                    { path: "dashboard", element: <AdminDashboard /> },
                    { path: "users", element: <Users /> },
                    { path: "exercises", element: <ExercisesManagement /> },
                    { path: "user/:userId", element: <UserPage /> },
                    { path: "user/:userId/plan/:planId", element: <UserPlan /> },
                    { path: "user/:userId/menu/:menuId", element: <UserMenu /> }
                ]
            },
        ]
    },
    { path: "*", element: <NotFound /> }
]);                                                                   