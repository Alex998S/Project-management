import React, {setState, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/main.sass'
import { useNavigate, useSearchParams } from "react-router-dom";

function DashboardLeftMenu(){
    return(
        <div className="d-flex flex-column bg-primary dashboard-left-menu border border-black">
            <button className="btn btn-success menu-item">Add user</button>
            
            <button className="btn btn-success menu-item">Users</button>
            
            <button className="btn btn-success menu-item">Customize tickets</button>
        </div>
    )
}

export default DashboardLeftMenu
