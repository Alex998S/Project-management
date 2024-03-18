import React, { useEffect, useState } from "react";
//import Ticket from './Ticket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import { useNavigate} from "react-router-dom";
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:3001"

async function addUser(user, setLoggedIn){
    const response = await axios.post("/users/login", {
        email: user.email,
        password: user.password
    },{
        withCredentials: true
    })
    const data = Promise.resolve(response)
    data.then(result=>{
        console.log("data from login:", response)
        if(response.data == "Logged in"){
            console.log('navigate')
            setLoggedIn(true)
        }
    })
}


function SignInPage(){

    const[loggedIn, setLoggedIn] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        if(loggedIn == true){
            navigate('/tickets')
        }
    },[loggedIn])

    let userObject = {};

    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = new FormData(e.target)
        const userArray = Object.entries(Object.fromEntries(data.entries()));
        userArray.map(element=>{
            userObject[element[0]] = element[1]
        })
        console.log("user that logged in", userObject)
        addUser(userObject, setLoggedIn);
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