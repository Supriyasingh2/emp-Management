const Employee = require('../models/Employee');

// Add an Employee
exports.addEmployee = async (req, res, next) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;
    const employee = await Employee.create({
      firstName,
      lastName,
      email,
      department,
      salary,
    });
    res.status(201).json(employee);
  } catch (error) {
        res.status(400).json(error);
  }
};

// Get all Employees
exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

// Update an Employee
exports.updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

// Delete an Employee
exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(204).json({ message: 'Employee deleted' });
  } catch (error) {
    next(error);
  }
};
