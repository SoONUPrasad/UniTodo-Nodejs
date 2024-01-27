const express = require('express');
const { dbConnection } = require('./src/db/connection');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
dbConnection(`${process.env.MONGO_URI}/auth-todo`);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// set view engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Routes
app.use('/', require('./src/routes/static.routes'));
app.use('/user', require('./src/routes/user.routes'));
app.use('/todo', require('./src/routes/todo.routes'));

module.exports = app;