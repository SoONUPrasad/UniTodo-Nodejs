const express = require('express');
const { createTodo, getTodos, deleteTodo, updateTodo } = require('../controllers/todo.controllers');
const { userCheck } = require('../middlewares/auth.middlewares');

const router = express.Router();

router.post('/add_todo',userCheck, createTodo);
router.get('/get_todos',userCheck, getTodos);
router.post('/delete_todo/:id', deleteTodo)
router.post('/update_todo/:id',userCheck, updateTodo)

module.exports = router