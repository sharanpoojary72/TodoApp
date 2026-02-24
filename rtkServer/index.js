const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const userRoutes = require('./router/userRoutes');
const todoRoutes = require('./router/todoRoutes');


const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', userRoutes);

app.use('/api/todos', todoRoutes);


app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})