import '../styles/navbar.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from "react-icons/fa"
import useAuth from "../hooks/useAuth";
import logo from "../assets/app_icon.png"
import useTheme from "../hooks/useTheme";
import { IoIosLogOut } from "react-icons/io";
import { HiChartPie, HiUsers, HiUser } from "react-icons/hi";
import { PiBarbellFill } from "react-icons/pi";
import { HiUserCircle } from "react-icons/hi2";
import { MdRestaurantMenu } from "react-icons/md";
import { Dropdown } from "flowbite-react";
import { useState } from 'react';
import useAdmin from '../hooks/useAdmin';
import { UsersList } from '../models/User';
import { GiMuscleUp } from "react-icons/gi";
import { LuMenu } from "react-icons/lu";


function Navbar() {
    const { darkMode, toggle } = useTheme();
    const { logoutUser, currentUser, isAdmin } = useAuth();
    const { users } = useAdmin();
    const [searchValue, setSearchValue] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<UsersList[]>([]);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchValue(searchTerm);

        const included = users.filter(user => {
            const fullName = user.firstName.concat(" ", user.lastName);
            return fullName.toLowerCase().includes(searchTerm);
        });

        setFilteredUsers(included);
    };

    return (
        <nav className="flex fixed z-10 h-fit w-full navbar-bg rounded-b-md justify-between md:justify-normal">
            <NavLink
                to={`${currentUser ?
                    isAdmin ?
                        "/admin/dashboard" :
                        "/user/dashboard" :
                    "/"}`}
                className="p-2 w-40 flex items-center gap-1">
                <img src={logo} alt="logo" className="w-10" />
                <span className='text-3xl font-semibold font-bebasNeue tracking-wide text-customBlue dark:text-customGold'>FitTrack</span>
            </NavLink>

            {currentUser
                ?
                <>
                    {isAdmin
                        ?
                        <ul className="hidden md:flex w-full items-center justify-evenly">
                            <div className='flex gap-5'>
                                <NavLink to="/admin/dashboard" className="nav-button">
                                    <HiChartPie className=" w-6 h-6" />
                                    <span className='ms-2'>Dashboard</span>
                                </NavLink>
                                <NavLink to="/admin/users" className="nav-button">
                                    <HiUsers className=" w-6 h-6" />
                                    <span className='ms-2'>Users</span>
                                </NavLink>
                                <NavLink to="/admin/exercises" className="nav-button">
                                    <GiMuscleUp className=" w-6 h-6" />
                                    <span className='ms-2'>Exercises</span>
                                </NavLink>
                            </div>

                            <div className='flex flex-col'>
                                <input type="text" value={searchValue} onChange={handleSearchChange} placeholder='Search users' className='rounded-lg border-gray-400 dark:bg-white dark:bg-opacity-20 focus:ring-1 focus:ring-customBlue dark:focus:ring-customGold focus:border-none' />
                                {searchValue && filteredUsers.length > 0 && (
                                    <ul className="absolute mt-11 bg-white border rounded shadow-lg max-h-40 w-52 overflow-y-auto dark:bg-dropDownBg dark:border-black ">
                                        {filteredUsers.map(user => (
                                            <li
                                                key={user.id}
                                                className="p-2 hover:bg-gray-200 dark:hover:text-customGold cursor-pointer"
                                                onClick={() => {
                                                    navigate(`/admin/user/${user.id}`);
                                                    setSearchValue("");
                                                }}
                                            >
                                                {user.id}. {user.firstName} {user.lastName}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </ul>
                        :
                        <ul className="hidden md:flex w-full justify-center gap-4 items-center">
                            <NavLink to="/user/dashboard" className="nav-button">
                                <HiChartPie className="w-6 h-6" />
                                <span className='ms-1'>Dashboard</span>
                            </NavLink>
                            <NavLink to="/user/profile" className="nav-button">
                                <HiUser className="w-6 h-6" />
                                <span className='ms-1'>Profile</span>
                            </NavLink>
                            <NavLink to="/user/plans" className="nav-button">
                                <PiBarbellFill className="w-6 h-6" />
                                <span className='ms-1'>Plans</span>
                            </NavLink>
                            <NavLink to="/user/menu" className="nav-button">
                                <MdRestaurantMenu className="w-6 h-6" />
                                <span className='ms-1'>Menu</span>
                            </NavLink>

                        </ul>}
                    <Dropdown className='dark:bg-black' dismissOnClick={true} renderTrigger={() => <button className='pe-2'><HiUserCircle color='' className='w-10 h-10 hover:text-customBlue dark:hover:text-customGold' /></button>}>
                        <span className='flex justify-center pt-1 text-md' >{currentUser.firstName} {currentUser.lastName} </span>
                        <span className='flex justify-center pb-2 text-xs' >{currentUser.email}</span>
                        <Dropdown.Item icon={HiChartPie} className="md:hidden dropdown-item"><NavLink to={`/${isAdmin ? "admin" : "user"}/dashboard`}>Dashboard</NavLink></Dropdown.Item>
                        {isAdmin
                            ?
                            <div className="md:hidden">
                                <Dropdown.Item icon={HiUsers} className='dropdown-item'><NavLink to="/admin/users">Users</NavLink></Dropdown.Item>
                                <Dropdown.Item icon={GiMuscleUp} className='dropdown-item'><NavLink to="/admin/exercises">Exercises</NavLink></Dropdown.Item>
                            </div>

                            :
                            <div className='md:hidden'>
                                <Dropdown.Item icon={HiUser} className='dropdown-item'><NavLink to="/user/profile">Profile</NavLink></Dropdown.Item>
                                <Dropdown.Item icon={PiBarbellFill} className='dropdown-item'><NavLink to="/user/plan">Plan</NavLink></Dropdown.Item>
                                <Dropdown.Item icon={MdRestaurantMenu} className='dropdown-item'><NavLink to="/user/menu">Menu</NavLink></Dropdown.Item>
                            </div>
                        }
                        <Dropdown.Item icon={darkMode ? FaSun : FaMoon} onClick={toggle} className='dropdown-item'>{darkMode ? "Light" : "Dark"} theme</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="dropdown-logout" icon={IoIosLogOut} onClick={logoutUser}><NavLink to="/">Logout</NavLink></Dropdown.Item>
                    </Dropdown>
                </>
                :
                <div className="flex items-center w-full justify-end">
                    <div className=' sm:hidden pr-5 text-2xl hover:cursor-pointer'>
                        <Dropdown dismissOnClick={false} className='dark:bg-black' renderTrigger={() => <span><LuMenu className='hover:dark:text-customGold' /></span>}>
                            <Dropdown.Item className="dropdown-item justify-center"><NavLink to="/about">About</NavLink></Dropdown.Item>
                            <Dropdown.Item className="dropdown-item justify-center"><NavLink to="/login">Login</NavLink></Dropdown.Item>
                            <Dropdown.Item className="dropdown-item justify-center"><NavLink to="/register">Register</NavLink></Dropdown.Item>
                            <Dropdown.Item icon={darkMode ? FaSun : FaMoon} onClick={toggle} className='dropdown-item'>{darkMode ? "Light" : "Dark"} theme</Dropdown.Item>
                        </Dropdown>
                    </div>

                    <ul className='hidden sm:flex gap-3'>
                        <NavLink to="/about" className="hover:text-customBlue dark:text-white dark:hover:text-customGold self-center">About</NavLink>
                        <NavLink to="/login" className="hover:text-customBlue dark:text-white dark:hover:text-customGold self-center">Login</NavLink>
                        <NavLink to="/register" className="hover:text-customBlue dark:text-white dark:hover:text-customGold self-center">Register</NavLink>
                        <button onClick={toggle} className='pr-2 hover:text-customBlue dark:text-white dark:hover:text-customGold'>{darkMode ? <FaSun /> : <FaMoon />}</button>
                    </ul>
                </div>}
        </nav>
    );
};

export default Navbar