import React, {setState, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import { useNavigate, useSearchParams } from "react-router-dom";



function LeftSideMenu({workspace}){

    const[searchParam, setSearchParam]= useSearchParams()

    const workspaceID = searchParam.get('workspace')

    const navigate = useNavigate()

    function goToDashboard(workspaceID){
        navigate({
            pathname: '/dashboard',
            search: `?workspace=${workspaceID}`
        })
    }

    return(
        <div className="container col-2 row">
            <div className="container">
                <button className="btn btn-success float-end mb-3" onClick={()=>goToDashboard(workspaceID)}>Dashboard</button>
            </div>
        </div>
    )
    
}


export default LeftSideMenu