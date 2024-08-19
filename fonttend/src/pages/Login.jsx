import React, { useState } from 'react';
import '../Style/Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';







const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const {name,email} = formData
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();  // Hook for navigation


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.email.trim()) {
            formErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = "Email address is invalid";
        }
        if (!formData.password) {
            formErrors.password = "Password is required";
        }
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, formData);
            const token = response.data.token;
            localStorage.setItem('token', token);
            // Redirect to the dashboard or another protected route
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
        }
    };}

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error' : ''}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;