import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Dashboard.css';




const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;