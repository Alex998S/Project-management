import express from 'express'
import workspaces from '../models/workspaceModel.js'
import mongoose from 'mongoose'
import { authenticateToken } from '../server.js'

const router = express()

router.get("/get-workspace", async(req, res)=>{

    var workspaceID = req.query.workspace
    console.log("server workspace", workspaceID)
    try{
        const workspacesDB = await workspaces.findById(workspaceID)
        res.json(workspacesDB).status(200)
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

router.post("/add-workspace", async(req,res)=>{
    const workspace = new workspaces({
        name: req.body.name,
        ticketModel: req.body.ticketModel
    })

    try{
        const newWorkspace = await workspace.save()
        res.status(200).json(newWorkspace)
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

router.put("/update-workspace-model", authenticateToken, async(req,res)=>{
    try{
        const updatedModel = await workspaces.findByIdAndUpdate(req.query.workspace, {ticketModel: req.body.newTicketModel}, {new: true})
        res.status(200).json(updatedModel)
    }catch(err){
        console.log(err)
        res.status(500)
    }
    
})



export default router