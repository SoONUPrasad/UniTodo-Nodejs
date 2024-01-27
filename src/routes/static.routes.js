const express = require('express')
const { userCheck } = require('../middlewares/auth.middlewares')
const { getTodos, updateTodo } = require('../controllers/todo.controllers')

const router = express.Router()

router.get('/', userCheck, getTodos);
router.get('/edit/:id', updateTodo);

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' })
})

router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Signup' })
})


module.exports = router
