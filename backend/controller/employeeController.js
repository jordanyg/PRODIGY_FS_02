const asyncHandler = require('express-async-handler');
const Employee = require('../models/Employee');

// Get employees
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json(employees);
});

// Add employee
const addEmployee = asyncHandler(async (req, res) => {
  const { name, email, position, salary } = req.body;

  if (!name || !email || !position || !salary) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const employee = await Employee.create({ name, email, position, salary });
  res.status(201).json(employee);
});

// Update employee
const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedEmployee);
});

// Delete employee
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  await employee.remove();
  res.status(200).json({ message: 'Employee removed' });
});

module.exports = { getEmployees, addEmployee, updateEmployee, deleteEmployee };