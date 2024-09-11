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

let workspaces = []
let userID = ''

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
        loginUser(userObject, setLoggedIn);
    }

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
            <WorkspaceSelection workspaces={signInResponse.workSpaces} userID={signInResponse.userID}/>
        </div>
    )
}

//login the user
async function loginUser(user, setLoggedIn){
    const response = await axios.post("/users/login", {
        email: user.email,
        password: user.password
    },{
        withCredentials: true
    })
    const data = Promise.resolve(response)
    data.then(result=>{
        //check if login was successful
        if(typeof response.data.userID != "undefined"){
            signInResponse = response.data
            setLoggedIn(true)
        }else{
           console.log("Login failed")
        }
    })
}

export default SignInPage;