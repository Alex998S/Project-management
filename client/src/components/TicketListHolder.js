import React, {useEffect, useState} from "react";
import {useSearchParams } from "react-router-dom";
import axios, { all } from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import TicketList from "./TicketList.js";
import '../stylesheets/ticket.sass'
import TopNavigationBar from "./TopNavigationBar.js";
import AddTicket from "./AddTicket.js";
import {Cookies} from 'react-cookie'

axios.defaults.baseURL = "http://localhost:3001"



let allTickets = [];
let newTickets =[];
let inProgressTickets =[];
let QATickets = [];
let doneTickets = [];
let suspendedTickets = [];
let filteredTickets = [];
//let receivedWorkspace.ticketModel;
let ticketsFilteredBySearchKey = []


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

function filterBySearchKey(allTickets, searchKey, status){
    ticketsFilteredBySearchKey = []
    let match = 0;
    let oneMatch = false
    if(searchKey != ""){
        allTickets.map(element  =>{
            const values = element.ticketValues
            for(let i = 0; i < values.length; i++){
                const ticketObjects = values[i].value
                const lowerCaseValues = ticketObjects.toLowerCase()
                if(lowerCaseValues.includes(searchKey.toLowerCase())){
                            match++
                }
                if(match>0){
                    ticketsFilteredBySearchKey.push(element)
                    match = 0
                    break;
                }
            }
        })
        return filterTickets(ticketsFilteredBySearchKey, status)
    }else{
        return filterTickets(allTickets, status)
    }
}

function readCookie(name) {
      const cookieString = document.cookie;
      const cookies = cookieString.split('; ');
  
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
          return cookieValue;
        }
      }
  
      return null; // Cookie not found
}
  
    

function TicketListHolder({receivedWorkspace}){

    console.log("[TicketListHolder]==receivedWorkspace", receivedWorkspace)

    const[ticketCount, setTicketCount]=useState(1)
    const[loading, setLoading] = useState(true)
    const[tickets, setTickets] = useState(0)
    const[ticketToOpen, setTicketToOpen] = useState("")
    const[searchKey, setSearchKey] = useState("")
    const[filteredTickets, setFilteredTickets] = useState(null)
    const[searchParam, setSearchParam]= useSearchParams()

    const workspaceID = searchParam.get('workspace')

    // useEffect(()=>{
        
    //     axios.get(`/get-workspace/?workspace=${workspaceID}`,{
    //         headers:{
    //             Authorization: readCookie('token')
    //         }
    //     }).then((response) => response.data.ticketModel)
    //         .then((data) =>{
    //             receivedWorkspace.ticketModel = data
    //         })
    // },[])

    const ticketModel = structuredClone(receivedWorkspace.ticketModel)

    useEffect(()=>{
        axios.get(`/tickets/?workspace=${workspaceID}`,{
            headers:{
                Authorization: readCookie('token')
            }
        })
            .then((response) => response.data)
            .then((data) =>{
                allTickets = data
                setTickets(data)
                setLoading(false)
            })
    },[ticketCount])

    

    useEffect(()=>{
        let timer = setTimeout(()=>{
            inProgressTickets = filterBySearchKey(allTickets, searchKey, "In Progress")
            newTickets = filterBySearchKey(allTickets, searchKey, "New")
            QATickets = filterBySearchKey(allTickets, searchKey, "QA")
            doneTickets = filterBySearchKey(allTickets, searchKey, "Done")
            suspendedTickets = filterBySearchKey(allTickets, searchKey, "Suspended")
            setFilteredTickets({
                searchKey: searchKey,
                ticketCount: ticketCount
            })
        }, 500)
        return() => clearTimeout(timer)
    }, [searchKey, ticketCount])

    const handleChange = (e) =>{
        setSearchKey(e.target.value)
    }
 

    if(loading){
        return <p>Loading</p>
    }

    function updateTicketCount(newCount){
        setTicketCount(newCount)   
    }

    function updateTicketToOpen(newTicket){
        setTicketToOpen(newTicket)
    }

        // inProgressTickets = filterBySearchKey(allTickets, searchKey, "In Progress")
        // newTickets = filterBySearchKey(allTickets, searchKey, "New")
        // QATickets = filterBySearchKey(allTickets, searchKey, "QA")
        // doneTickets = filterBySearchKey(allTickets, searchKey, "Done")
        // suspendedTickets = filterBySearchKey(allTickets, searchKey, "Suspended")

    
    return(
        <div className="container col-10 row">
            <div className="container ticketHeader col-12">
                <TopNavigationBar currentTickets={ticketCount} updateTicketCount={updateTicketCount} ticketModel={ticketModel} ticketToOpen={ticketToOpen} updateTicketToOpen={updateTicketToOpen} users={receivedWorkspace.users}/>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" onChange={handleChange} value={searchKey}></input>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                </div>
            </div>
            <div className="ticket-list-holder col-12">
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>New</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={newTickets} count={newTickets.length} ticketModel={ticketModel} updateTicketToOpen={updateTicketToOpen} users={receivedWorkspace.users}/>
                        </div>
                    </div>
                </div>
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>In progress</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={inProgressTickets} count={inProgressTickets.length} ticketModel={ticketModel} updateTicketToOpen={updateTicketToOpen} users={receivedWorkspace.users}/>
                        </div>
                    </div>
                </div>
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>QA</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={QATickets} count={QATickets.length} ticketModel={ticketModel} updateTicketToOpen={updateTicketToOpen} users={receivedWorkspace.users}/>
                        </div>
                    </div>
                </div>
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>Done</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={doneTickets} count={doneTickets.length} ticketModel={ticketModel} updateTicketToOpen={updateTicketToOpen} users={receivedWorkspace.users}/>
                        </div>
                    </div>
                </div>
                <div className="row scrollable">
                    <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                        <div className="container">
                            <h3>Suspended</h3>
                        </div>
                        <div className="container scrollDiv">
                            <TicketList data={suspendedTickets} count={suspendedTickets.length} ticketModel={ticketModel} updateTicketToOpen={updateTicketToOpen} users={receivedWorkspace.users}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}



export default TicketListHolder
