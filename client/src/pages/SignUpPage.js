import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
//import Ticket from './Ticket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001"

// create new user
async function addUser(user, setLoggedIn, goToPage){
    if(user.hasOwnProperty('workSpaceName')){
        const response = await axios.post("/users/add-user/?workspace=", {
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
        })
    }
}

function SignUpPage(){

    const[loggedIn, setLoggedIn] = useState(false)
    
    let userObject = {}

    const navigate = useNavigate()

    //navigate to the tickets page
    function goToPage(workspaceID){
        navigate({
            pathname: '/tickets',
            search: `?workspace=${workspaceID}`
        })
    }

    useEffect(()=>{
        if(loggedIn == true){
            navigate(`/tickets`)
        }
    },[loggedIn])

    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = new FormData(e.target)
        const userArray = Object.entries(Object.fromEntries(data.entries()));
        userArray.map(element=>{
            userObject[element[0]] = element[1]
        })
        addUser(userObject, setLoggedIn, goToPage);
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
            <div className="mb-3">
                        <label for="create" className="form-label">Set your workspace name</label>
                        <input className="form-control" id="create" name="workSpaceName"></input>
                    </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default SignUpPage;