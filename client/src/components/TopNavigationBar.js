import React, {useState, setState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/ticket.sass'
import AddTicket from "./AddTicket";

let showPopUp = false;

function TopNavigationBar(props){

    const[pressed, setPressed] = useState(showPopUp)
    
    //console.log("ticketCount in top navigation", rest)

    if(!pressed){
        return(
            <div className="container mt-3">
                <button type="button" className="btn btn-primary" onClick={()=>setPressed(true)}>Create Ticket</button>
                <AddTicket props={pressed} currentTickets={props.currentTickets} updateTicketCount={props.updateTicketCount}/>
            </div>
        )
    }else{
        //window.history.replaceState(null, null, "/create-ticket")
        return(
            <div className="container mt-3">
                <button type="button" className="btn btn-primary" onClick={()=>setPressed(false)}>Close Ticket</button>
                <AddTicket props={pressed} currentTickets={props.currentTickets} updateTicketCount={props.updateTicketCount}/>
            </div>
        )
    }
}

export default TopNavigationBar