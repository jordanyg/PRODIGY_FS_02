import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = ({ employee, refreshEmployees }) => {
  const [formData, setFormData] = useState(employee || { name: '', email: '', position: '', salary: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (employee) {
      // Edit existing employee
      await axios.put(`/api/employees/${employee._id}`, formData);
    } else {
      // Add new employee
      await axios.post('/api/employees', formData);
    }

    refreshEmployees();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" />
      <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" />
      <button type="submit">{employee ? 'Update' : 'Add'} Employee</button>
    </form>
  );
};

export default EmployeeForm;