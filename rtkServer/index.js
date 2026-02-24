const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const userRoutes = require('./router/userRoutes');
const todoRoutes = require('./router/todoRoutes');


const app = express();

connectDB();

app.use(cors({
    // Replace the second string with your actual Vercel deployment URL
    origin: ['http://localhost:5173', 'todo-app-ruddy-seven-34.vercel.app'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', userRoutes);

app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});