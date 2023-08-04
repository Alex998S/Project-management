import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

function Ticket(props){
    console.log("ticket here")
    return(
        <div className="container shadow bg-body-tertiary rounded border rounded">
            <div className="row back-color-magenta border rounded">
                <h6>{props.data.type}</h6>
            </div>
            <div className="row">
                <div className="col-10">
                    <p>{props.data.title}</p>
                </div>
                <div className="col-2 container">
                    <i className="img-fluid fa-solid fa-user-tie fa-2xl"></i>
                </div>
            </div>
        </div>
    )
}

export default Ticket;