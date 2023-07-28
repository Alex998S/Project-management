import express from 'express'
import tickets from '../models/ticketModel.js'

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
        type: req.body.type,
        status: req.body.status,
        title: req.body.title,
        description: req.body.description,
        createdBy: req.body.createdBy,
        assignedTo: req.body.assignedTo,
        contributors: req.body.contributors,
        createdDate: req.body.createdDate,
        startDate: req.body.startDate,
        endDate:  req.body.endDate,
        eta: req.body.eta,
        eta2: req.body.eta2,
        comments: req.body.comments
    })

    try{
        const newTicket = await ticket.save()
        res.status(200).json(newTicket)
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

export default router
