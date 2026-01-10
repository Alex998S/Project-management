import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
//import Ticket from './Ticket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/main.sass'
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
        <div className="container">
            <div className="welcome-page-container border border-primary rounded-1">
                <h3 className="login-title">Welcome!</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input className="input-form border border-primary rounded-1" id="first-name" name="first_name" placeholder="First Name"></input>
                    </div>
                    <div className="mb-3">
                        <input className="input-form border border-primary rounded-1" id="last-name" name="last_name" placeholder="Last name"></input>
                    </div>
                    <div className="mb-3">
                        <input type="email" className="input-form border border-primary rounded-1" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"></input>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="input-form border border-primary rounded-1" id="password" name="password" placeholder="Password"></input>
                    </div>
                    <div className="mb-3">
                                <input className="input-form border border-primary rounded-1" id="create" name="workSpaceName" placeholder="Set your workspace name"></input>
                            </div>
                    <div className="welcome-button-container">
                        <button type="submit" className="auth-button">
                            <span>Sign up</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
       
    )
}

export default SignUpPage;