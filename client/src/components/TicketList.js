import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'


function TicketList(props){

    // const[tickets, setTickets] = useState(props.count)

    // useEffect(()=>{
    //     setTickets(props.count)
    // }, [props.count])

    if(props.data != []){
        return(
            // <React.Fragment>
            <div>
                 {props.data.map(element =>{
                    return(
                        <div className="row mx-1 my-2">
                            <Ticket data={element} key={element._id} ticketModel={props.ticketModel}/>
                        </div>
                    )
                })}
            </div>
               
            // </React.Fragment>    
        )
    }
}

export default TicketList