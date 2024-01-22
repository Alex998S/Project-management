import React, {useEffect, useState} from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import TicketList from "./TicketList.js";
import '../stylesheets/ticket.sass'
import TopNavigationBar from "./TopNavigationBar.js";
import AddTicket from "./AddTicket.js";

axios.defaults.baseURL = "http://localhost:3001"



let allTickets = [];
let newTickets;
let inProgressTickets;
let QATickets;
let doneTickets;
let suspendedTickets;
let filteredTickets = [];
let ticketModel;


//console.log("all tickets", allTickets)
//returns tickets based on status
function filterTickets(allTickets, status){
    filteredTickets = []
    allTickets.map(element=>{
        const values = element.ticketValues
        values.map(object=>{
            if(object.title == "Status" && object.value == status){
                filteredTickets.push(element)
            }
        })
    })
    return filteredTickets
}

function TicketListHolder(){

    const[ticketCount, setTicketCount]=useState(1)
    const[loading, setLoading] = useState(true)
    const[tickets, setTickets] = useState(0)
    const[ticketToOpen, setTicketToOpen] = useState("")

    useEffect(()=>{
        
        axios.get("/create-ticket")
            .then((response) => response.data[0].ticketModel)
            .then((data) =>{
                ticketModel = data
                console.log("called ticket model", ticketModel)
            })
    },[])

    useEffect(()=>{
        axios.get("/")
            .then((response) => response.data)
            .then((data) =>{
                allTickets = data
                setTickets(data)
                setLoading(false)
            })
    },[ticketCount])

    if(loading){
        return <p>Loading</p>
    }

    newTickets = filterTickets(allTickets,"New")
    inProgressTickets = filterTickets(allTickets,"In Progress")
    QATickets = filterTickets(allTickets,"QA")
    doneTickets = filterTickets(allTickets,"Done")
    suspendedTickets = filterTickets(allTickets,"Suspended")

    function updateTicketCount(newCount){
        setTicketCount(newCount)   
    }

    function updateTicketToOpen(newTicket){
        setTicketToOpen(newTicket)
    }

    return(
        <div className="container col-10 row">
            <div className="container ticketHeader col-12">
                <TopNavigationBar currentTickets={ticketCount} updateTicketCount={updateTicketCount} ticketModel={ticketModel} ticketToOpen={ticketToOpen} updateTicketToOpen={updateTicketToOpen}/>
            </div>
            <div className="ticket-list-holder col-12">
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>New</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={newTickets} count={newTickets.length} ticketModel={ticketModel} updateTicketToOpen={updateTicketToOpen}/>
                        </div>
                    </div>
                </div>
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>In progress</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={inProgressTickets} count={inProgressTickets.length} ticketModel={ticketModel} updateTicketToOpen={updateTicketToOpen}/>
                        </div>
                    </div>
                </div>
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>QA</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={QATickets} count={QATickets.length} ticketModel={ticketModel} updateTicketToOpen={updateTicketToOpen}/>
                        </div>
                    </div>
                </div>
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>Done</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={doneTickets} count={doneTickets.length} ticketModel={ticketModel} updateTicketToOpen={updateTicketToOpen}/>
                        </div>
                    </div>
                </div>
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>Suspended</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={suspendedTickets} count={suspendedTickets.length} ticketModel={ticketModel} updateTicketToOpen={updateTicketToOpen}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}



export default TicketListHolder
