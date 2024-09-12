import React, {useEffect, useState} from "react";
import axios, { all } from 'axios'
import {useSearchParams } from "react-router-dom";
//import Ticket from './Ticket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/main.sass'
import CreateTicketModel from "../components/CreateTicketModel.js";
import DashboardLeftMenu from "../components/DashboardLeftMenu.js";

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
            <div className="main-container d-flex flex-row">
                <DashboardLeftMenu/>
                <CreateTicketModel receivedWorkspace={receivedWorkspace}/>
            </div>
        )
    }
    
}

export default DashboardPage;