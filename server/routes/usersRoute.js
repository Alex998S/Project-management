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

// 

router.post("/add-user/", async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const workspaceID = new mongoose.mongo.ObjectId()
        const userID = new mongoose.mongo.ObjectId()

        let user = {}
        
        //creates new user without creating a new workspace
        if(req.query.workspace != ''){
            console.log("workspace ID from url", req.query.workspace)
            const workspaceID = new mongoose.Types.ObjectId(req.query.workspace)
            user = new users({
                _id: userID,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hashedPassword,
                workSpaces:[{
                    _id: workspaceID,
                    name: req.body.workSpaceName,
                    userLevel: req.body.userLevel,
                    departaments: req.body.workSpaceDepartaments
                }]
            })
        // creates a new user and a new workspace
        }else{
            user = new users({
                _id: userID,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hashedPassword,
                workSpaces:[{
                    _id: workspaceID,
                    name: req.body.workSpaceName,
                    userLevel: "owner",
                    departaments: req.body.workSpaceDepartaments
                }]
            })
            //create a new workspace
            createNewWorkspace(userID, req.body.workSpaceName, workspaceID)
        }
       
        //save the user and ser the token cookie
        const newUser = await user.save()
        res.cookie("token", generateAccessToken(req.body.email,{
            httpOnly: true
        })).json(newUser.workSpaces).send("Logged in").status(200)
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

//logging in a user, not includind invites
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

//adding a new workspace to an existing user
router.put("/add-user-workspace/:id", authenticateToken, async (req, res)=>{
    try{
        const userID = new mongoose.Types.ObjectId(req.params.id)
        const workspaceID = new mongoose.mongo.ObjectId()
        const workspace = await createNewWorkspace(userID, req.body.name, workspaceID)
        const updatedUser = await users.findByIdAndUpdate(req.params.id, {$push:{workSpaces:workspace}}, {new: true})
        res.status(200).json(workspace._id)
    }catch(err){
        res.status(500)
        console.log(err)
    }
})

//creating an invite
router.post("/send-invite/:workspaceID", authenticateToken, async(req, res)=>{
    
    const randPassword = Math.random().toString(36).substring(2,7);
    const hashedPassword = await bcrypt.hash(randPassword, 10)
    const workspaceID = new mongoose.Types.ObjectId(req.params.workspaceID)
    console.log("workspaceID from invite", workspaceID)
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
        workspace: workspaceID,
        workspaceName: req.body.workspaceName
    })
    try{
        const newInvite = await invite.save()
        res.status(200).json(newInvite)
    }catch(err){
        res.status(500)
        console.log(err)
    }
    
})

//creating a workspace and returning the object
async function createNewWorkspace(userID, workspaceName, workspaceID){
    const workspace = new workspaces({
        _id: workspaceID,
        name: workspaceName,
        owner: userID,
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

//logging in user from invitation
router.post("/login-from-invite", async(req, res)=>{
    try{
        const invite = await invites.findOne({email: req.body.email})
        if(invite){
            const isValidPassword = req.body.password
        
            if(isValidPassword){
                res.cookie("token", generateAccessToken(req.body.email,{
                    httpOnly: true
                })).json({
                    userID: invite._id,
                    workSpaces: invite.workspace,
                    departaments: invite.departaments,
                    workspaceName: invite.workspaceName,
                    userLevel: invite.userLevel
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

export default router
