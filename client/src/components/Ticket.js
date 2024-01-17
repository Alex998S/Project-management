import React, { useState } from "react";
import OpenTicket from './OpenTicket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

function Ticket(props){

    const[opened, setOpened] = useState(false)

    //console.log("the ticket", props)
    const titleObject = props.data.ticketValues.find(object => object.title === "Add title")
    const typeObject = props.data.ticketValues.find(object => object.title === "Type")

    return(
        <div className="container shadow bg-body-tertiary rounded border rounded" onClick={()=>setOpened(true)}>
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
            <OpenTicket data={props.data} key={props.key} ticketModel={props.ticketModel} open={opened}/>
        </div>
    )
}

export default Ticket;