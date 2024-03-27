const express = require('express');
const { 
  addEmployee, 
  getAllEmployees, 
  updateEmployee, 
  deleteEmployee 
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', addEmployee)
router.get('/', getAllEmployees);
router.put('/:id', updateEmployee);
router.delete('/:id',protect, deleteEmployee);

module.exports = router;
