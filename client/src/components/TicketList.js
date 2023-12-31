import React from "react";
import Ticket from "./Ticket";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'


function TicketList(props){
    return(
        // <React.Fragment>
        <div>
             {props.data.map(element =>{
                return(
                    <div className="row mx-1 my-2">
                        <Ticket data={element}/>
                    </div>
                )
                
            })}
        </div>
           
        // </React.Fragment>    
    )
}

export default TicketList