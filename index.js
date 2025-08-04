const express = require("express");
const app = express();
const studentRoutes = require('./routes/student.routes')
const connectDB = require("./config/database");
const auth = require("./middleware/outh")
const userRoutes = require("./routes/users.routes")
const { MulterError } = require("multer");
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")
const cors = require("cors");
const path = require("path");


connectDB()
const PORT = process.env.PORT;

const limiter = rateLimit({
    windowMs: 1000 * 60,
    max: 5,
    message: "Too many request from IP, Please try again latter"
})


app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use("/uploads",express.static(path.join(__dirname,"/uploads")))

app.use(cors())

app.use(helmet())

app.use(limiter)

app.use("/api/users", userRoutes)

app.use(auth)
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