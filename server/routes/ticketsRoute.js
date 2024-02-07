import express from 'express'
import tickets from '../models/ticketModel.js'
import mongoose from 'mongoose'

const router = express()

router.get("/", async(req, res)=>{
    try{
        const ticketsDB = await tickets.find()
        res.json(ticketsDB)
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

router.post("/", async(req,res)=>{
    const ticket = new tickets({
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

router.put("/:id", async (req, res)=>{
    try{
        const updatedTicket = await tickets.findByIdAndUpdate(req.params.id, {$set:{ticketValues:req.body.ticketValues}}, {new: true})
        res.status(200).json(updatedTicket)
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

export default router
