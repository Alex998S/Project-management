import express from 'express'
import companies from '../models/companyModel.js'

const router = express()

router.get("/create-ticket", async(req, res)=>{
    try{
        const companiesDB = await companies.find()
        res.json(companiesDB)
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

router.post("/add-ticket-model", async(req,res)=>{
    const company = new companies({
        name: req.body.name,
        ticketModel: req.body.ticketModel
    })

    try{
        const newCompany = await company.save()
        res.status(200).json(newCompany)
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

export default router
