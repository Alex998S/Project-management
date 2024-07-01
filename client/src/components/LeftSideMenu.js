import React, {setState, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import AddTicket from "./AddTicket";


let showPopUp = false;

function LeftSideMenu({workspace}){

    const[pressed, setPressed] = useState(showPopUp)

    console.log(workspace)

    if(!pressed){
        return(
            <div className="container col-2 border">
                <button type="button" className="btn btn-primary" onClick={()=>setPressed(true)}>Create Ticket</button>
            </div>
        )
    }else{
        return(
            <div className="container col-2 border">
                <button type="button" className="btn btn-primary" onClick={()=>setPressed(false)}>Close Ticket</button>
            </div>
        )
    }
}

export default LeftSideMenu