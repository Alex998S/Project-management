import React from "react";
import Ticket from "./Ticket";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

function TicketList(){
    return(
        <div className="container parent-width-25 m-4 shadow bg-secondary-subtle">
            <div className="container">
                <h3>New Tickets</h3>
            </div>
             <div className="container scrollDiv">
                <div className="row mx-1 my-2">
                    <Ticket/>
                </div>
                <div className="row mx-1 my-2">
                    <Ticket/>
                </div>
                <div className="row mx-1 my-2">
                    <Ticket/>
                </div>
                <div className="row mx-1 my-2">
                    <Ticket/>
                </div>
                <div className="row mx-1 my-2">
                    <Ticket/>
                </div>
                <div className="row mx-1 my-2">
                    <Ticket/>
                </div>
                <div className="row mx-1 my-2">
                    <Ticket/>
                </div>
                <div className="row mx-1 my-2">
                    <Ticket/>
                </div>
                <div className="row mx-1 my-2">
                    <Ticket/>
                </div>
                <div className="row mx-1 my-2">
                    <Ticket/>
                </div>
                <div className="row mx-1 my-2">
                    <Ticket/>
                </div>
        </div>
        </div>
       
    )
}

export default TicketList