require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorHandler');
const connection=require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);


app.use(errorHandler);
app.get('/',(req,res)=>{
        res.send("hello");
    })

const PORT = process.env.PORT || 8080;
app.listen(PORT,async()=>{
        try{
           await connection,
           console.log("connected to db");
           console.log(`Server is running at port ${PORT}`);
        
        }
        catch(err){
            console.log(err);
        }
    })