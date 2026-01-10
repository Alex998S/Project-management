import React, {useEffect, useState} from "react";
import {useSearchParams } from "react-router-dom";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/main.sass'
import Dropdown from "./Dropdown.js";
import TextArea from "./TextArea.js";
import SmallTextArea from './SmallTextArea.js'
import DatePicker from "./DatePicker.js";

axios.defaults.baseURL = "http://localhost:3001"

let ticketValues = []
let newCount

function setNewState(oldCount){
    let newCount = oldCount + 1
    return newCount
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

async function postTicket(ticketValues, props, newCount, workspaceID){
    
    const response = await axios.post(`/tickets/post-ticket/?workspace=${workspaceID}`, {
        ticketValues: ticketValues
    },{
        headers:{
            Authorization: readCookie('token')
        }
    })
    const data = Promise.resolve(response)
    data.then(result=>{
        props.updateTicketCount(newCount.currentTickets)
        props.showTheForm(false)
    })
}

function AddTicket(props){

    const[searchParam, setSearchParam]= useSearchParams()
    const workspaceID = searchParam.get('workspace')

    let show = props.props

    console.log("[AddTicket]==props", props)

    if(show){
        ticketValues =[]

        const handleSubmit = (e) =>{
            e.preventDefault()
            let aug;
            const data = new FormData(e.target)
            const formTicket = Object.entries(Object.fromEntries(data.entries()));
            props.ticketModel.map(element =>{
                let value;
                formTicket.map(key =>{
                    if(element.title == key[0]){
                        value = key[1]
                    }
                })
                element.value = value
                delete element.options
                ticketValues.push(element)
            })
            
            newCount ={...props}
            newCount.currentTickets = newCount.currentTickets + 1
            console.log("ticketvalues", ticketValues)
            console.log("newCount", newCount.currentTickets)
            postTicket(ticketValues, props, newCount, workspaceID)
        }
        return(
            <div className="ticket-form scrollable border border-primary rounded-1">
                <div className="container border rounded scroll-size-70">
                    <form onSubmit={handleSubmit} className="d-flex flex-column">
                        <div className="">
                            <button className="btn btn-danger float-end m-3" onClick={()=>props.showTheForm(false)}>
                                Close
                            </button>
                            <button className="btn btn-success float-end m-3" type="submit">
                                Save
                            </button>
                        </div>
                        <div className="available-workspaces-container">
                            {props.ticketModel.map(element =>{
                                switch(element.inputType){
                                    case "textArea":
                                        return(
                                            <TextArea element={element}/>
                                        )
                                        break;
                                    case "dropdown":
                                        return(
                                            <Dropdown name={element.title} data={element} key={element.title} value="" dynamicFields={props.dynamicFields}/>
                                        )
                                        break;
                                    case "smallTextArea":
                                        return(
                                            <DatePicker name={element.title} data={element} key={element.title} value=""/>
                                        )
                                        break;
                                    default:
                                        console.log("No match for input types")
                                }
                            })}
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export {
    AddTicket,
    readCookie
}