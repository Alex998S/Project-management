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

let workspaces = []

function SignInPage(){

    const[loggedIn, setLoggedIn] = useState(false)

    let userObject = {};

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = new FormData(e.target)
        const userArray = Object.entries(Object.fromEntries(data.entries()));
        userArray.map(element=>{
            userObject[element[0]] = element[1]
        })
        console.log("user that logged in", userObject)
        signInResponse = addUser(userObject, getResponse);
    }

    function getResponse(response){
        console.log("response from getResponse", response)
        signInResponse = response
        workspaces = response.workSpaces
        if(typeof signInResponse.userID != "undefined"){
            setLoggedIn(true)
        }
    }

    useEffect(()=>{
        if(loggedIn == true){
            console.log("userID: ", signInResponse.userID)
            //navigate(`/select-workspace/${signInResponse.userID}`)
        }
    },[loggedIn])

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
            <WorkspaceSelection workspaces={workspaces}/>
        </div>
    )
}

async function addUser(user, getResponse){
    const response = await axios.post("/users/login", {
        email: user.email,
        password: user.password
    },{
        withCredentials: true
    })
    const data = Promise.resolve(response)
    data.then(result=>{
        console.log("data from login:", response)
        if(typeof response.data.userID != "undefined"){
            console.log("API response", response.data)
            getResponse(response.data)
        }else{
            getResponse({error: "Sign in failed"})
        }
    })
}

export default SignInPage;