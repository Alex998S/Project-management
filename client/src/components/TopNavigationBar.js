import React, {useState, setState} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/main.sass'
import {AddTicket} from "./AddTicket";
import OpenTicket from "./OpenTicket";

let showPopUp = false;

function TopNavigationBar(props){

    const[pressed, setPressed] = useState(showPopUp)

    const[searchParam, setSearchParam]= useSearchParams()
    
    const workspaceID = searchParam.get('workspace')

    const navigate = useNavigate()

    function showTheForm(param){
        setPressed(param)
    }
    
    function setPressedState(){
        if(pressed){
            setPressed(false)
        }else{
            setPressed(true)
        }
    }

    function goToDashboard(workspaceID){
        navigate({
            pathname: '/dashboard',
            search: `?workspace=${workspaceID}`
        })
    }

    console.log("[TopNavigationBar]==props", props)

    return(
        <div className="container">
            <div className="top-button-container">
                <button type="button" className="auth-button ms-5" onClick={setPressedState}>
                    <span>Create Ticket</span>
                </button>
                <button type="button" className="auth-button" onClick={()=>goToDashboard(workspaceID)}>
                    <span>Dashboard</span>
                </button>
            </div>
            <div className="container">
                <AddTicket props={pressed} currentTickets={props.currentTickets} updateTicketCount={props.updateTicketCount} showTheForm={showTheForm} ticketModel={props.ticketModel} dynamicFields={props.dynamicFields}/>
                <OpenTicket ticketToOpen={props.ticketToOpen} currentTickets={props.currentTickets} updateTicketCount={props.updateTicketCount} ticketModel={props.ticketModel} updateTicketToOpen={props.updateTicketToOpen} dynamicFields={props.dynamicFields}/>
            </div>
        </div>
        
    )
}

export default TopNavigationBar