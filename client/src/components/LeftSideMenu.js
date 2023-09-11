import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import AddTicket from "./AddTicket";

function LeftSideMenu(){
    return(
        <div className="container col-2 border">
            <button type="button" class="btn btn-primary">Create Ticket</button>
            <AddTicket/>
        </div>
    )
}

export default LeftSideMenu