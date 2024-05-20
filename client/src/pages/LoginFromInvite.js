import React, { useEffect, useState } from "react";
//import Ticket from './Ticket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import { useNavigate} from "react-router-dom";
import axios from 'axios'
import WorkspaceSelection from "../components/WorkspaceSelection.js";

axios.defaults.baseURL = "http://localhost:3001"

let signInResponse = {}

let departaments = []
let workspaces = []
let userID = ''
let userInfo = {}
let userObject = {};

function LoginFromInvite(){

    const[loggedIn, setLoggedIn] = useState(false)

    const navigate = useNavigate()

    function goToPage(workspaceID){
        navigate({
            pathname: '/tickets',
            search: `?workspace=${workspaceID}`
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = new FormData(e.target)
        const userArray = Object.entries(Object.fromEntries(data.entries()));
        userArray.map(element=>{
            userObject[element[0]] = element[1]
        })
        console.log("userObject", userObject)
        if(userObject.hasOwnProperty('first_name')){
            addUser(userObject, setLoggedIn, goToPage);
        }else{
            signInResponse = loginUser(userObject, getResponse);
        }
        
    }

    function getResponse(response){
        signInResponse = response
        departaments = response.departaments
        workspaces = response.workSpaces
        userID = response.userID
        if(typeof signInResponse.userID != "undefined"){
            setLoggedIn(true)
        }
    }

    useEffect(()=>{
        if(loggedIn == true){
           userInfo = userObject
           console.log("logged In", userObject)
        }
    },[loggedIn])

    if(!loggedIn){
        return(
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" name="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password"></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }else{
        console.log(userInfo)
        return(
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label for="first-name" className="form-label">First Name</label>
                <input className="form-control" id="first-name" name="first_name"></input>
            </div>
            <div className="mb-3">
                <label for="last-name" className="form-label">Last name</label>
                <input className="form-control" id="last-name" name="last_name"></input>
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" id="exampleInputEmail1" value={userObject.email} aria-describedby="emailHelp"></input>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="password" name="password" className="form-label">Add a new password</label>
                <input type="password" className="form-control" id="password" name="password"></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        )
    }
    
}

async function loginUser(user, getResponse){
    const response = await axios.post("/users/login-from-invite", {
        email: user.email,
        password: user.password
    },{
        withCredentials: true
    })
    const data = Promise.resolve(response)
    data.then(result=>{
        console.log("data from login:", response)
        if(typeof response.data.userID != "undefined"){
            getResponse(response.data)
        }else{
            getResponse({error: "Sign in failed"})
        }
    })
}

async function addUser(user, setLoggedIn, goToPage){
    if(user.hasOwnProperty('workSpaceName')){
        const response = await axios.post("/users/add-user/?workspaceExists=false", {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            workSpaceName: user.workSpaceName,
            workSpaceUserLevel: 'owner',
            workSpaceDepartaments: []
        },{
            withCredentials: true
        })
        const data = Promise.resolve(response)
        data.then(result=>{
            console.log(response.data)
            if(typeof response.data != "undefined"){
                goToPage(response.data[0]._id)
            }
            // if(response.data == "Logged in"){
            //     console.log('navigate')
            //     //setLoggedIn(true)
                
            // }
        })
    }
}

export default LoginFromInvite;