import React from "react";
//import Ticket from './Ticket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/main.sass'
import { useNavigate } from "react-router-dom";

function WelcomePage(){

    const navigate = useNavigate()

    function navigateToSignIn(){
        navigate('/signin')
    }
    
    function navigateToSignUp(){
        navigate('/signup')
    }

    return(
        <div className="container">
            <button className="btn btn-primary" onClick={navigateToSignIn}>Sing in</button>
            <button className="btn btn-primary" onClick={navigateToSignUp}>Sign up</button>
        </div>
    )
}

export default WelcomePage;