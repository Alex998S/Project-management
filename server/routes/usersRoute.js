import express from 'express'
import mongoose from 'mongoose'
import users from '../models/userModel.js'
import workspaces from '../models/workspaceModel.js'
import invites from '../models/invitesSent.js'
import bcrypt from 'bcrypt'
import { authenticateToken, generateAccessToken } from '../server.js'

const router = express()

const ticketModel = [
    {
        inputType: "textArea",
        title: "Add title"
    },
    {
        inputType: "textArea",
        title: "Add description"
    },
    {
        inputType: "dropdown",
        title: "Type",
        options: [
            "Maintenance",
            "Request",
            "Bug fix",
            "Onboard",
            "Daily",
            "New script"
        ]
    },
    {
        inputType: "dropdown",
        title: "Status",
        options: [
            "New",
            "QA",
            "In Progress",
            "Done",
            "Suspended"
        ]
    },
    {
        inputType: "dropdown",
        title: "Created by",
        options: [
            "Alex",
            "Mircea",
            "Delia",
            "Andrei"
        ]
    },
    {
        inputType: "dropdown",
        title: "Assigned to",
        options: [
            "Alex",
            "Mircea",
            "Delia",
            "Andrei"
        ]
    },
    {
        inputType: "dropdown",
        title: "Contributors",
        options: [
            "Alex",
            "Mircea",
            "Delia",
            "Andrei"
        ]
    },
    {
        inputType: "smallTextArea",
        title: "Created date"
    },
    {
        inputType: "smallTextArea",
        title: "Start date"
    },
    {
        inputType: "smallTextArea",
        title: "ETA"
    },
    {
        inputType: "smallTextArea",
        title: "ETA 2"
    },
    {
        inputType: "smallTextArea",
        title: "End date"
    }
]

router.post("/add-user", async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const workspaceID = new mongoose.mongo.ObjectId()
        const userID = new mongoose.mongo.ObjectId()
        const user = new users({
            _id: userID,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
            workSpaces:[{
                _id: workspaceID,
                name: req.body.workSpaceName,
                userLevel: req.body.workSpaceUserLevel,
                departaments: req.body.workSpaceDepartaments
            }]
        })

        const workspace = new workspaces({
            _id: workspaceID,
            name: req.body.workSpaceName,
            owner: userID,
            ticketModel: ticketModel,
            departaments: []
        })
        const newUser = await user.save()
        const newWorkspace = await workspace.save()
        res.cookie("token", generateAccessToken(req.body.email,{
            httpOnly: true
        })).json(newUser.workSpaces).send("Logged in").status(200)
        //generateAccessToken(req.body.email)
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
                })).json({
                    userID: user._id,
                    workSpaces: user.workSpaces
                    }).status(200)
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

router.put("/add-user-workspace/:id", authenticateToken, async (req, res)=>{
    try{
        const workspace = await createNewWorkspace(req.params.id, req.body.name)
        const updatedUser = await users.findByIdAndUpdate(req.params.id, {$push:{workSpaces:workspace}}, {new: true})
        res.status(200).json(workspace._id)
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

router.post("/add-user-to-workspace/:workspaceID", authenticateToken, async(req, res)=>{
    const randPassword = Math.random().toString(36).substring(2,7);
    const hashedPassword = await bcrypt.hash(randPassword, 10)
    const workspaceID = new mongoose.Types.ObjectId(req.params.workspaceID)
    let level = ''
    if(req.body.userLevel != undefined || req.body.userLevel != null){
        level = req.body.userLevel
    }else{
        level = 'basic'
    }
    const invite = new invites({
        email: req.body.email,
        password: hashedPassword,
        userLevel: level,
        workspace: workspaceID
    })
    try{
        const newInvite = await invite.save()
        res.status(200).json(newInvite)
    }catch(err){
        res.status(500)
        console.log(err)
    }
    
})

async function createNewWorkspace(userID, workspaceName){
    const workspaceID = new mongoose.mongo.ObjectId()
    const objectID = new mongoose.Types.ObjectId(userID)
    const workspace = new workspaces({
        _id: workspaceID,
        name: workspaceName,
        owner: objectID,
        ticketModel: ticketModel,
        departaments: []
    })
    const newWorkspace = await workspace.save()
    return {
        _id: workspaceID,
        name: workspaceName,
        userLevel: "owner",
        departaments: []
    }
}

export default router
