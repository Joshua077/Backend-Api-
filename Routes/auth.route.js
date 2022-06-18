const express = require("express")
const { Signup,Login } = require("../Controller/auth.controller")

const authRouter = express.Router()

authRouter.post("/register",Signup)
authRouter.post("/login",Login)


module.exports={
    authRouter
}