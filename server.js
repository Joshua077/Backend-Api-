const express = require("express");
const app = express();
const dotenv = require("dotenv").config()
const mongoose = require("mongoose");
const { authRouter } = require("./Routes/auth.route");
const { noteRouter } = require("./Routes/user");

// MIDDLEWARES and routes
app.use(express.json())
app.use("/api/user",authRouter)
app.use("/api/notes",noteRouter)

app.get("/",(req,res)=>{
    res.send("JESUS MY LOVER")
})

//DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI).then((res)=>
console.log("connecct")).catch((err)=>console.log("error"))

// PORT
const PORT = process.env.PORT
app.listen(PORT)