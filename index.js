const express = require("express");
const app = express();
const studentRoutes = require('./routes/student.routes')
const connectDB = require("./config/database");
const { MulterError } = require("multer");


connectDB()
const PORT = process.env.PORT;


app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use("/api/students", studentRoutes)

app.use((error,req,res,next)=>{
    if(error instanceof MulterError){
        return res.status(400).send(`Image error: ${error.message} : ${error.code}`)
    }
    else if(error){
        return res.status(500).send(`Something wnet wrong ${error.message}`)
    }next()
})


app.listen(PORT,()=>{
console.log(`Server is run ${PORT}`);
});