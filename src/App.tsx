import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './hooks/useAuth';
import { Outlet } from 'react-router-dom';

function App() {

  const { currentUser } = useAuth();

  return (currentUser
    ? <div className="app-bg">
      <Outlet />
    </div>
    : <Outlet />);
};

export default App;
