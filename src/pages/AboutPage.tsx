import '../styles/AboutPage.scss'

function AboutPage() {
    return (
        <main className="aboutPage">
            <h1>About FitTrack</h1>
            <p>Welcome to FitTrack, the ultimate web application designed for individuals who aspire to lead a healthier lifestyle with the personalized support of a professional trainer. Our platform bridges the gap between trainers and their clients, providing an intuitive and flexible way to achieve fitness goals, track progress, and maintain a balanced routine.</p>
            <h2>Why FitTrack?</h2>
            <p>FitTrack was born out of a passion for fitness and the desire to make personal training accessible to everyone, regardless of location or schedule. Whether you’re just starting your fitness journey or looking to take your training to the next level, FitTrack ensures you have all the tools and guidance you need to succeed.</p>
            <h2>Key Features</h2>
            <section className="flex justify-between">
                <article className="flex-col">
                    <h3>For Users:</h3>
                    <ol>
                        <li>
                            <b>Personalized Workout Plans</b> Receive workout plans tailored to your goals, created by professional trainers.
                        </li>
                        <li>
                            <b>Nutritional Menus</b> Access balanced meal plans designed to complement your fitness routine.
                        </li>
                        <li>
                            <b>Progress Tracking</b> Update and monitor your body measurements, weight, and progress over time.
                        </li>
                        <li>
                            <b>Convenient Access</b> View your plans and menus anytime, anywhere, and train on your own schedule.
                        </li>
                    </ol>
                </article>
                <article className="flex-col">
                    <h3>For Trainers (Admins):</h3>
                    <ol>
                        <li>
                            <b>Plan and Menu Management</b> Create, edit, and delete workout plans and nutritional menus for clients.
                        </li>
                        <li>
                            <b>User Insights</b> Access site statistics, such as user count and engagement metrics.
                        </li>
                        <li>
                            <b>Streamlined Communication</b> Collaborate with clients to update plans based on their progress and feedback.
                        </li>
                    </ol>
                </article>
            </section>
            <h2>How FitTrack Works</h2>
            <ol>
                <li>
                    <b>User Registration</b> Sign up and complete your profile with essential details such as goals, body measurements, and dietary preferences.
                </li>
                <li>
                    <b>Trainer Assignment</b> Trainers are assigned to users to provide personalized plans and ongoing support.
                </li>
                <li>
                    <b>Plan Implementation</b> Access your tailored workout and nutritional plans via the user dashboard.
                </li>
                <li>
                    <b>Track Progress</b> Update your weight, measurements, and performance to allow your trainer to adjust plans as needed.
                </li>
                <li>
                    <b>Achieve Goals</b> Work towards your fitness targets with a structured and professional approach.
                </li>
            </ol>
            <h2>Seamless Integration</h2>
            <p>FitTrack is built with cutting-edge technology to ensure a smooth and efficient user experience. Our backend, powered by ASP.NET Web API and SQL, guarantees secure and reliable data handling. The frontend, developed using React, TypeScript, and Tailwind CSS, delivers a responsive and user-friendly interface accessible from any device.</p>
            <h2>Get Started Today</h2>
            <p>Join FitTrack and take the first step towards a healthier, fitter you. Whether you’re a user seeking professional guidance or a trainer looking to expand your reach, FitTrack is here to support your journey. Let’s make fitness accessible, flexible, and effective—together.</p>
        </main>
    )
}

export default AboutPage