import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
//import Ticket from './Ticket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001"

async function addUser(user, setLoggedIn){
    const response = await axios.post("/users/add-user", {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password
    },{
        withCredentials: true
    })
    const data = Promise.resolve(response)
    data.then(result=>{
        if(response.data == "Logged in"){
            console.log('navigate')
            setLoggedIn(true)
        }
    })
}

function SignUpPage(){

    const[loggedIn, setLoggedIn] = useState(false)
    
    let userObject = {};

    const navigate = useNavigate()

    useEffect(()=>{
        if(loggedIn == true){
            navigate('/tickets')
        }
    },[loggedIn])

    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = new FormData(e.target)
        const userArray = Object.entries(Object.fromEntries(data.entries()));
        userArray.map(element=>{
            userObject[element[0]] = element[1]
        })
        console.log("new organization", userObject)
        addUser(userObject, setLoggedIn);
    }

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
                <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="password" name="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password"></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default SignUpPage;