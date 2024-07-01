import React, {useEffect, useState} from "react";
import axios, { all } from 'axios'
import {useSearchParams } from "react-router-dom";
//import Ticket from './Ticket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import CreateTicketModel from "../components/CreateTicketModel.js";

axios.defaults.baseURL = "http://localhost:3001"

let receivedWorkspace;

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

function DashboardPage(){

    const[loaded, setLoaded] = useState(false)
    const[searchParam, setSearchParam]= useSearchParams()

    const workspaceID = searchParam.get('workspace')

    useEffect(()=>{
        axios.get(`/get-workspace/?workspace=${workspaceID}`,{
            headers:{
                Authorization: readCookie('token')
            }
        }).then((response) => response.data)
            .then((data) =>{
               receivedWorkspace = data
                setLoaded(true)
            })
    },[])

    if(!loaded){
        return(
            <div>Loading..</div>
        )
    }
    else{
        console.log("in dashboard page", receivedWorkspace)
        return(
            <div>
                <h1>You are on the dashboard page</h1>
                <CreateTicketModel receivedWorkspace={receivedWorkspace}/>
            </div>
        )
    }
    
}

export default DashboardPage;