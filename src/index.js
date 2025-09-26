const express = require('express');
const app = express();
const {PORT} = require('./config/index')



const startServer = async()=>{
    app.use(express.json());
    app.use(express.urlencoded({extended:true}))
    app.listen(PORT,()=>{
        console.log(`${PORT} is starting`)
    })
} 
startServer();