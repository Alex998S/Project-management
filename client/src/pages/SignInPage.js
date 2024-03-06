import React from "react";
//import Ticket from './Ticket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:3001"

async function addUser(user){
    const response = await axios.post("/users/add-user", {
        email: user.email,
        password: user.password
    })
    const data = Promise.resolve(response)
    data.then(result=>{
        console.log("user logged in")
    })
}


function SignInPage(){

    let userObject = {};

    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = new FormData(e.target)
        const userArray = Object.entries(Object.fromEntries(data.entries()));
        userArray.map(element=>{
            userObject[element[0]] = element[1]
        })
        console.log("user that logged in", userObject)
        addUser(userObject);
    }

    const navigate = useNavigate()

    function navigateToSignIn(){
        navigate('/signin')
    }
    
    function navigateToSignUp(){
        navigate('/signup')
    }

    return(
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
    )
}

export default SignInPage;