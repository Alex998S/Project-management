import React, { useEffect, useState } from "react";
//import Ticket from './Ticket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/main.sass'
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

    // navigation function
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

        //if submited form has 'first_name' filed, creates a new user
        if(userObject.hasOwnProperty('first_name')){
            addUser(userObject, signInResponse, goToPage);
        }else{
            loginUser(userObject, setLoggedIn)
        }
        
    }

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

//logged in the user
async function loginUser(user, setLoggedIn){
    const response = await axios.post("/users/login-from-invite", {
        email: user.email,
        password: user.password
    },{
        withCredentials: true
    })
    const data = Promise.resolve(response)
    data.then(result=>{
        if(typeof response.data.userID != "undefined"){
            signInResponse = response.data
            if(typeof signInResponse.userID != "undefined"){
                        setLoggedIn(true)
                    }
        }else{
            console.log("Login failed")
        }
    })
}

//creating a new user
async function addUser(user, signInResponse, goToPage){

    const response = await axios.post(`/users/add-user/?workspace=${signInResponse.workSpaces}`, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        workSpaceName: signInResponse.workspaceName,
        userLevel: signInResponse.userLevel,
        workSpaceUserLevel: signInResponse.userLevel,
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
    })
}

export default LoginFromInvite;