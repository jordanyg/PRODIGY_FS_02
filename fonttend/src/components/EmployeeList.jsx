import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee._id}>
            {employee.name} - {employee.position}
            {/* Add buttons for edit/delete */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;