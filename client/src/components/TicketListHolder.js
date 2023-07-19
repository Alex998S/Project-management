import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import TicketList from "./TicketList";
import '../stylesheets/ticket.sass'

function TicketListHolder(){
    return(
        <div className="conteiner">
            <div className="ticket-list-holder">
                <div className="row scrollable">
                    <TicketList/>
                </div>
                <div className="row scrollable">
                    <TicketList/>
                </div>
                <div className="row scrollable">
                    <TicketList/>
                </div>
                <div className="row scrollable">
                    <TicketList/>
                </div>
                <div className="row scrollable">
                    <TicketList/>
                </div>
            </div>
        </div>
        
    )
}

export default TicketListHolder
