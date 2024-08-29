import React, {setState, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import { useNavigate, useSearchParams } from "react-router-dom";

function DashboardLeftMenu(){
    return(
        <div className="container scrollDiv">
            <div className="container">
                <button className="btn btn-success float-end mb-3">A link</button>
            </div>
        </div>
    )
}

export default DashboardLeftMenu
