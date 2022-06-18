const { Note } = require("../Model/notes");
const Joi = require('joi');
const { note } = require("@hapi/joi/lib/base");


const createNotes = async (req,res) =>{
    const {name,tittle,comments} = req.body
  
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        tittle: Joi.string().required(),
        comments: Joi.string().required(),
        
      });

const {error} = schema.validate(req.body)
if(error){
   return res.status(400
        ).json({
            success: false,
            message: error.details[0].message
        })
}

   const note = new Note ({
    name ,
   tittle,
   comments,
   user:req.user.id
   })
   try{
const newnote = await note.save()

return res.status(201).json({
    success:true,
    data: newnote
})
   }catch(error){
    return  res.status(500).send(error.message)
   }

}

const getNotes = async(req,res)=>{
    try{
        const notes = await Note.find({user:req.user.id})
        if(notes){
            return res.status(200).json({
                success:true,
                data:notes
            })
        }
           
    } catch(err){
        return res.status(500).send(error.message)
    }
    
     
}

const getSingleNote = async(req,res)=>{
    try{

        const note = await Note.findOne({_id:req.params.id})
        if(!note){
          return  res.status(404).json({
                success:false,
                message:"useer not found"
            })
        }
      return  res.status(200).json({
            success:true,
            note
        })
            }catch(err){
              return  res.status(500).send(err.message)
        
            }
}

const deleteSingleNote = async(req,res)=>{
    try{

        const note = await Note.findOne({_id:req.params.id})
        if(!note){
            return  res.status(404).json({
                success:false,
                message:"Note not found"
            })
        }
       else{
        if(note.user.toString() !== req.user.id.toString()){
            return  res.status(403).json({
                success:false,
                message:"UnAuthorized",
            })
        }

        
         await Note.deleteOne({_id:req.params.id})
         return  res.status(200).json({
            success:true,
            message:"Note Deleted"
        })
       
       }
       
       

       
      
            }catch(err){
              return  res.status(500).send(err.message)
        
            }
}
const UpdateSingleNote = async(req,res)=>{
    
    try{

        const note = await Note.findOne({_id:req.params.id})
        if(!note){
            return  res.status(404).json({
                success:false,
                message:"Note not found"
            })
        }
       else{
        if(note.user.toString() !== req.user.id.toString()){
            return  res.status(403).json({
                success:false,
                message:"UnAuthorized",
            })
        }

        
       await Note.updateOne({_id:req.params.id}, {$set:req.body},{new:true})
         return  res.status(200).json({
            success:true,
            message:"Note Updated"
        })
       
       }
       
       

       
      
            }catch(err){
              return  res.status(500).send(err.message)
        
            }
}
module.exports={
    createNotes,
    getNotes,
    getSingleNote,
    deleteSingleNote,
    UpdateSingleNote
}