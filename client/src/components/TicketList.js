import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'


function TicketList(props){

    if(props.data != []){
        return(
            <div>
                 {props.data.map(element =>{
                    return(
                        <div className="row mx-1 my-2" key={element._id}>
                            <Ticket data={element} key={element._id} ticketModel={props.ticketModel} updateTicketToOpen={props.updateTicketToOpen}/>
                        </div>
                    )
                })}
            </div>   
        )
    }
}

export default TicketList