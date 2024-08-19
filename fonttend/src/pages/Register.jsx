import React from 'react'
import { useState } from 'react';
import '../Style/Register.css'
import axios from 'axios'
// function Register() {

    const Register = () => {
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        const {name,email,password,confirmPassword} = formData
    
        const [errors, setErrors] = useState({});
    
        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };
    
        const validateForm = () => {
            let formErrors = {};
            if (!formData.name.trim()) {
                formErrors.name = "Name is required";
            }
            if (!formData.email.trim()) {
                formErrors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                formErrors.email = "Email address is invalid";
            }
            if (!formData.password) {
                formErrors.password = "Password is required";
            } else if (formData.password.length < 6) {
                formErrors.password = "Password must be at least 6 characters";
            }
            if (!formData.confirmPassword) {
                formErrors.confirmPassword = "Confirm password is required";
            } else if (formData.confirmPassword !== formData.password) {
                formErrors.confirmPassword = "Passwords do not match";
            }
            return formErrors;
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            const formErrors = validateForm();
            if (Object.keys(formErrors).length === 0) {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, formData);
                    console.log('Registration successful:', response.data);
                    // Handle success (e.g., redirect to login)
                } catch (error) {
                    console.error('There was an error registering the user!', error);
                    // Handle error (e.g., show error message)
                }
            } else {
                setErrors(formErrors);
            }
        };
    
    
        return (
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id='name'
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id='email'
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
                            id='password'
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                        />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    };
    
//}

export default Register