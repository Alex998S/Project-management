import React, { useState } from "react";
import OpenTicket from './OpenTicket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

function Ticket(props){

    const[opened, setOpened] = useState(false)

    const titleObject = props.data.ticketValues.find(object => object.title === "Add title")
    const typeObject = props.data.ticketValues.find(object => object.title === "Type")

    //console.log(props)

    return(
        <div className="container shadow bg-body-tertiary rounded border rounded" onClick={()=>props.updateTicketToOpen(props.data.ticketValues)}>
            <div className="row back-color-magenta border rounded">
                <h6>{typeObject.value}</h6>
            </div>
            <div className="row">
                <div className="col-10">
                    <p>{titleObject.value}</p>
                </div>
                <div className="col-2 container">
                    <i className="img-fluid fa-solid fa-user-tie fa-2xl"></i>
                </div>
            </div>
        </div>
    )
}

export default Ticket;