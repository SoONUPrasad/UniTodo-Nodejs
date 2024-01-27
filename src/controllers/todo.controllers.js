const Todo = require('../models/todo.models');

async function createTodo(req, res) {
    try {
        const { title, category, description, status } = req.body;
        if (!title || !category) {
            return res.status(400).json({
                success: false,
                message: 'Please provide title and category'
            })
        }
        const todo = await Todo.create({ title, category, description, status,createdBy: req.user._id });
        if (!todo) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong'
            })
        }
        res.status(201).redirect('/')
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function getTodos(req, res) {
    try {
        const todo = await Todo.find({ createdBy: req.user._id });
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'No todos found'
            })
        }
        res.status(200).render('home.ejs', {
            title: 'TODO APP',
            todos: todo
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function deleteTodo(req, res) {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            })
        }
        res.status(200).redirect('/')
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function updateTodo(req, res) {
    try {
        const { id } = req.params;
        const { title, category, description, status } = req.body;
        const todo = await Todo.findByIdAndUpdate(id, { title, category, description, status });
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            })
        }
        res.status(200).render('edit.ejs', {
            title: 'TODO APP',
            todo
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo
}