import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

function Ticket(){
    return(
        <div className="container shadow bg-body-tertiary rounded border rounded">
            <div className="row back-color-magenta border rounded">
                <p>Daily</p>
            </div>
            <div className="row">
                <div className="col-9">
                    <p>This is the header</p>
                </div>
                <div className="col-3">
                    <i class="fa-solid fa-user-tie fa-2xl"></i>
                </div>
            </div>
        </div>
    )
}

export default Ticket;