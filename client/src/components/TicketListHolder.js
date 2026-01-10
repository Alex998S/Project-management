import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios, { all } from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import TicketList from "./TicketList.js";
import '../stylesheets/main.sass'
import TopNavigationBar from "./TopNavigationBar.js";
import {Cookies} from 'react-cookie'

axios.defaults.baseURL = "http://localhost:3001"



let allTickets = [];
let ticketsFilteredBySearchKey = []


function filterTicketsByStatus(allTickets, status){
    let filteredTickets = []
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
    let filteredTickets = []
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
                    filteredTickets.push(element)
                    match = 0
                    break;
                }
            }
        })
        //return filterTicketsByStatus(filteredTickets, status)
        return filteredTickets
    }else{
        //return filterTicketsByStatus(allTickets, status)
        return allTickets
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


    const ticketModel = structuredClone(receivedWorkspace.ticketModel)

    let dynamicFields = (({ users, ticketStateColumns }) => ({ users, ticketStateColumns }))(receivedWorkspace)

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
            ticketsFilteredBySearchKey =filterBySearchKey(allTickets, searchKey, "In Progress")
            
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
    
    return(
        <div className="container">
            <div className="top-container">
                <TopNavigationBar currentTickets={ticketCount} updateTicketCount={updateTicketCount} ticketModel={ticketModel} ticketToOpen={ticketToOpen} updateTicketToOpen={updateTicketToOpen} dynamicFields={dynamicFields}/>
                <div className="container search-bar-container mb-3">
                    <input type="text" className="search-bar border border-primary rounded-1" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" onChange={handleChange} value={searchKey}></input>
                    {/* <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button> */}
                </div>
            </div>
            <div className="ticket-list-holder border border-primary rounded-1 mx-5">
                {receivedWorkspace.ticketStateColumns.map(element=>{
                    let ticketsFilteredByStatus = filterTicketsByStatus(ticketsFilteredBySearchKey, element)
                    return(
                        <div className="row scrollable">
                            <div className="container parent-width-20 m-4 shadow bg-secondary-subtle">
                                <div className="container">
                                    <h3>{element}</h3>
                                </div>
                                <div className="container scrollDiv">
                                    <TicketList data={ticketsFilteredByStatus} count={ticketsFilteredByStatus.length} ticketModel={ticketModel} updateTicketToOpen={updateTicketToOpen} dynamicFields={dynamicFields}/>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        
    )
}



export default TicketListHolder
