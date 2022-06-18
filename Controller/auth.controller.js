
const Joi = require('joi');
const { Student } = require('../Model/students');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



const Signup = async (req,res) =>{
    const saltRounds = 10;

    const {name,email,password} = req.body
    const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = bcrypt.hashSync(password, salt);
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(16).required(),
        
      });

const {error} = schema.validate(req.body)
if(error){
   return res.status(400
        ).json({
            success: false,
            message: error.details[0].message
        })
}
const existingUser = await Student.findOne({email:req.body.email})
if(existingUser){
 return    res.status(400).json({
        success:false,
        message:"User already exist"
    })
}
   const student = new Student({
    name ,
    email,
    password :hashPassword
   })
   try{
const newStudent = await student.save()
const {password ,...others} = newStudent._doc
return res.status(201).json({
    success:true,
    data: others
})
   }catch(error){
    res.status(500).send(error.message)
   }

}

const Login = async (req,res) =>{
    
    const {email,password} = req.body
    

    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(16).required(),
        
      });

const {error} = schema.validate(req.body)
if(error){
   return res.status(400
        ).json({
            success: false,
            message: error.details[0].message
        })
}

const existingUser = await Student.findOne({email:req.body.email})
if(!existingUser){
 return    res.status(400).json({
        success:false,
        message:"User dosent exist"
    })
}
   try{
const validate = await bcrypt.compare(req.body.password,existingUser.password)
if(!validate){
  return  res.status(404).json({
    success:false,
    message:"Invalid Password"
  })
}
var token = jwt.sign({ id : existingUser._id }, process.env.JWT_TOKEN);
return res.status(201).json({
    success:true,
    email,
    token
})
   }catch(error){
    return  res.status(500).send(error.message)
   }

}

module.exports={
    Signup,
    Login
}