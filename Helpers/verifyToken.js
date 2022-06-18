var jwt = require('jsonwebtoken');

const verifyToken = async (req,res, next)=>{

   if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
    try{
        const token = req.headers.authorization.split(" ")[1]
       const validatedToken =  jwt.verify(token, process.env.JWT_TOKEN)
       if(!validatedToken){
        res.status(400).json({success:false,
            message:"Invalid Token"})
       } 
       
        req.user = validatedToken

        
next()
    }
    
    catch(err){
res.send(err.message)
    }
   }else{
        res.status(400).json({success:false,
        message:"Access Denied"})
   }
}



module.exports={
  verifyToken  
}