import React, {useState, setState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/ticket.sass'
import {AddTicket} from "./AddTicket";
import OpenTicket from "./OpenTicket";

let showPopUp = false;

function TopNavigationBar(props){

    const[pressed, setPressed] = useState(showPopUp)

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

    console.log("[TopNavigationBar]==props", props)

    return(
        <div className="container mt-3">
            <button type="button" className="btn btn-primary" onClick={setPressedState}>Create Ticket</button>
            <AddTicket props={pressed} currentTickets={props.currentTickets} updateTicketCount={props.updateTicketCount} showTheForm={showTheForm} ticketModel={props.ticketModel} dynamicFields={props.dynamicFields}/>
            <OpenTicket ticketToOpen={props.ticketToOpen} currentTickets={props.currentTickets} updateTicketCount={props.updateTicketCount} ticketModel={props.ticketModel} updateTicketToOpen={props.updateTicketToOpen} dynamicFields={props.dynamicFields}/>
        </div>
    )
}

export default TopNavigationBar