const express = require('express');
const router = express.Router();
const { getTasks, createTask, getTask, updateTask, deleteTask, toggleComplete } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { validateTask } = require('../middleware/validate');

router.use(protect);

router.route('/').get(getTasks).post(validateTask, createTask);
router.route('/:id').get(getTask).put(validateTask, updateTask).delete(deleteTask);
router.patch('/:id/complete', toggleComplete);

module.exports = router;
