import React, {useEffect, useState} from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
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

async function postTicket(ticketValues, props, newCount){
    const response = await axios.post("/", {
        ticketValues: ticketValues
    })
    const data = Promise.resolve(response)
    data.then(result=>{
        props.updateTicketCount(newCount.currentTickets)
        props.showTheForm(false)
    })
}

function AddTicket(props){

    let show = props.props
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
            postTicket(ticketValues, props, newCount)
        }
        return(
            <div className="container scrollable">
                <div className="add-ticket-form container border rounded scroll-size-70">
                    <form onSubmit={handleSubmit}>
                        <button className="btn btn-success float-end mb-3" type="submit">
                            Save
                        </button>
                        <button className="btn btn-success float-end mb-3" onClick={()=>props.showTheForm(false)}>
                            Close
                        </button>
                        {props.ticketModel.map(element =>{
                            switch(element.inputType){
                                case "textArea":
                                    return(
                                        <TextArea name={element.title} key={element.title} data={element} value=""/>
                                    )
                                    break;
                                case "dropdown":
                                    return(
                                        <Dropdown name={element.title} data={element} key={element.title} value=""/>
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
                    </form>
                </div>
            </div>
        )
    }
}

export default AddTicket