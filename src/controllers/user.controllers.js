const User = require('../models/user.models');
const { v4 } = require('uuid');
const { setCheckAuth } = require('../utils/checkAuth');

const uuid = v4;

async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email and password'
            })
        }
        const user = await User.create({ name, email, password });
        if (!user) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong'
            })
        }
        res.status(201).redirect('/login');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            })
        }
        // const sessionId = uuid();
        // setCheckAuth(sessionId, user);
        const token  = setCheckAuth(user);
        // res.cookie('sessionId', sessionId);
        res.cookie('token', token);
        res.status(200).redirect('/');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function logoutUser(req, res) {
    try {
        res.clearCookie('token');
        res.status(200).redirect('/login');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { registerUser, loginUser, logoutUser };
