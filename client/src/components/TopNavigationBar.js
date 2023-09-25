import React, {useState, setState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/ticket.sass'
import AddTicket from "./AddTicket";

let showPopUp = false;

function TopNavigationBar(props){

    const[pressed, setPressed] = useState(showPopUp)

    if(!pressed){
        return(
            <div className="container mt-3">
                <button type="button" className="btn btn-primary" onClick={()=>setPressed(true)}>Create Ticket</button>
                <AddTicket props={pressed}/>
            </div>
        )
    }else{
        return(
            <div className="container">
                <button type="button" className="btn btn-primary" onClick={()=>setPressed(false)}>Close Ticket</button>
                <AddTicket props={pressed}/>
            </div>
        )
    }
}

export default TopNavigationBar