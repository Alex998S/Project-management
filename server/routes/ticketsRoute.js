import express from 'express'
import tickets from '../models/ticketModel.js'
import mongoose from 'mongoose'
import { authenticateToken } from '../server.js'

const router = express()



router.get("/", authenticateToken, async(req, res)=>{
    var workspaceID = new mongoose.mongo.ObjectId(req.query.workspace)
    try{
        const ticketsDB = await tickets.find({workspaceID: workspaceID})
        res.json(ticketsDB)
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

router.post(`/post-ticket`, authenticateToken, async(req,res)=>{
    var workspaceID = new mongoose.mongo.ObjectId(req.query.workspace)
    const ticket = new tickets({
        workspaceID: workspaceID,
        ticketValues: req.body.ticketValues
    })

    console.log(ticket)

    try{
        const newTicket = await ticket.save()
        res.status(200).json(newTicket)
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

router.put("/:id", authenticateToken, async (req, res)=>{
    try{
        const updatedTicket = await tickets.findByIdAndUpdate(req.params.id, {$set:{ticketValues:req.body.ticketValues}}, {new: true})
        res.status(200).json(updatedTicket)
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

export default router
