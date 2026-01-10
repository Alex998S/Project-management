import React, { useState } from "react";
import OpenTicket from './OpenTicket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/main.sass'

function Ticket(props){

    const[opened, setOpened] = useState(false)

    console.log("[Ticket]==props", props)


    const titleObject = props.data.ticketValues.find(object => object.hardcodedTitle === "title")
    const typeObject = props.data.ticketValues.find(object => object.hardcodedTitle === "issue_type")

    console.log("[Ticket]==titleObject", titleObject)

    return(
        <div className="container ticket bg-body-tertiary rounded  border border-primary rounded-1" onClick={()=>props.updateTicketToOpen(props.data)}>
            <div className="row border border-bottom-1 rounded-1">
                <h5>{titleObject.value}</h5>
            </div>
            <div className="row mt-2">
                <div className="col-10">
                <h6>{typeObject.value}</h6>
                </div>
                <div className="col-2 container">
                    <i className="img-fluid fa-solid fa-user-tie fa-2xl"></i>
                </div>
            </div>
        </div>
    )
}

export default Ticket;