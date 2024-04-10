import express from 'express'
import users from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateAccessToken } from '../server.js'

const router = express()

router.post("/add-user", async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new users({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
            workSpaces:[{
                name: req.body.workSpaceName,
                userLevel: req.body.workSpaceUserLevel,
                departaments: req.body.workSpaceDepartaments
            }]
        })
        const newUser = await user.save()
        res.cookie("token", generateAccessToken(req.body.email,{
            httpOnly: true
        })).send("Logged in").status(200).json(newUser)
        generateAccessToken(req.body.email)
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

router.post("/login", async(req, res)=>{
    try{
        const user = await users.findOne({email: req.body.email})
        if(user){
            const isValidPassword = await bcrypt.compare(req.body.password, user.password)
        
            if(isValidPassword){
                res.cookie("token", generateAccessToken(req.body.email,{
                    httpOnly: true
                })).send("Logged in").status(200)
            }else{
                res.send("Incorrect password")
            }
        }else{
            res.send("Email not found")
        }
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

export default router
