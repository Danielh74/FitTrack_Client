import { Link } from 'react-router-dom'
import '../styles/background.scss';
import '../App.css';


function Home() {

    return (
        <main className="home-bg">
            <div className="flex flex-col text-white  w-4/6">
                <h1 className='pt-5 pl-5 text-6xl font-black font-bebasNeue dark:text-customGold tracking-wider'>FitTrack by Avner</h1>
                <div className='p-5 text-lg font-montserrat'>
                    <p>
                        Welcome to FitTrack, your all-in-one fitness platform designed to help you achieve your health goals, no matter your experience level.
                    </p>
                    <p>
                        FitTrack offers personalized workout plans tailored to your objective,
                        along with detailed tracking tools to monitor your progress over time.
                    </p>
                    <p>
                        Our app connects you with an expert trainer who crafts custom routines and nutritional guides to optimize your fitness journey.
                    </p>
                    <p>
                        FitTrack empowers you to take control of your fitness, stay consistent, and reach your full potential.
                    </p>
                </div>
                <Link className='save-button self-center px-10' to="/login">Login</Link>
                <span className='p-5 font-medium'>Not a member yet? <Link to="/register" className="hover:underline dark:text-customGold text-blue-500">Register now</Link></span>
            </div>
        </main>
    )
}

export default Home