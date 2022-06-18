const express = require("express")
const { createNotes,getNotes, getSingleNote,deleteSingleNote,UpdateSingleNote } = require("../Controller/note.controller")
const { verifyToken } = require("../Helpers/verifyToken")
 
const noteRouter = express.Router()

noteRouter.get("/",verifyToken,getNotes)
noteRouter.get("/:id",verifyToken,getSingleNote)
noteRouter.delete("/delete/:id",verifyToken,deleteSingleNote)

noteRouter.post("/create",verifyToken,createNotes)
noteRouter.put("/update/:id",verifyToken,UpdateSingleNote)



module.exports={
    noteRouter
}