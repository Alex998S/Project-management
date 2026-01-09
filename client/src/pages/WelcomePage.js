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
        <div className="welcome-background">
            <div className="welcome-page-container border border-primary rounded-1">
                <h1 className="welcome-title">Welcome!</h1>
                <h1 className="welcome-title">Task & Progress Manager</h1>
                <div className="welcome-button-container">
                    <button className="auth-button" onClick={navigateToSignIn}>
                    <span>Login</span>
                    </button>
                    <button className="auth-button" onClick={navigateToSignUp}>
                        <span>Sign up</span>
                    </button>
                </div>
            </div>
        </div>
        
    )
}

export default WelcomePage;