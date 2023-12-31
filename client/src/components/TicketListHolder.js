import React from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import TicketList from "./TicketList.js";
import '../stylesheets/ticket.sass'
import Ticket from "./Ticket.js";

axios.defaults.baseURL = "http://localhost:3001"

const response = await axios.get("/")
const allTickets = response.data
console.log(allTickets)

const newTickets = await filterTickets("New")
const inProgressTickets = await filterTickets("In progress")
const QATickets = await filterTickets("QA")
const doneTickets = await filterTickets("Done")
const suspendedTickets = await filterTickets("Suspended")

function filterTickets(status){
    return allTickets.filter((word) => word.status === status)
}

function TicketListHolder(){
    return(
        <div className="container col-10">
            <div className="ticket-list-holder">
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>New</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={newTickets}/>
                        </div>
                    </div>
                </div>
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>In progress</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={inProgressTickets}/>
                        </div>
                    </div>
                </div>
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>QA</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={QATickets}/>
                        </div>
                    </div>
                </div>
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>Done</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={doneTickets}/>
                        </div>
                    </div>
                </div>
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>Suspended</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={suspendedTickets}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default TicketListHolder
