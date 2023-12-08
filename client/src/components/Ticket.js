import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

function Ticket(props){
    console.log("the ticket", props.data.ticketValues)
    const titleObject = props.data.ticketValues.find(object => object.title === "Add title")
    const typeObject = props.data.ticketValues.find(object => object.title === "Type")
    return(
        <div className="container shadow bg-body-tertiary rounded border rounded">
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