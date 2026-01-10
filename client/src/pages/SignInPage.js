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
            {/* <h1>Task & Progress Manager</h1> */}
            {/* <div className="log-in-container border border-primary rounded-1"> */}
            <div className="welcome-page-container border border-primary rounded-1">
                <h3 className="login-title">Welcome back!</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email" className="input-form border border-primary rounded-1" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"></input>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="input-form border border-primary rounded-1" id="password" name="password" placeholder="Password"></input>
                    </div>
                    <div className="welcome-button-container">
                        <button type="submit" className="auth-button">
                            <span>Login</span>
                        </button>
                    </div>
                </form>
                <WorkspaceSelection workspaces={signInResponse.workSpaces} userID={signInResponse.userID}/>
            </div>
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