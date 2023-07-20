import express from 'express'
import Tickets from '../models/ticketModel.js'

const router = express()

router.get("/", async(req, res)=>{
    try{
        const tickets = await Tickets.find()
        res.json(tickets)
    }catch{err}{
        res.status(500)
    }
})

router.post("/", async(req,res)=>{
    const ticket = new Tickets({
        type: req.body.name,
        stauts: req.body.status,
        title: req.body.title,
        description: req.body.description,
        createdBy: req.body.description,
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
    }
})

export default router
