import React, {useEffect, useState} from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import Dropdown from "./Dropdown.js";
import TextArea from "./TextArea.js";
import SmallTextArea from './SmallTextArea.js'

axios.defaults.baseURL = "http://localhost:3001"

let ticketValues = []
let newCount
let ticketModelWithValues

function setNewState(oldCount){
    let newCount = oldCount + 1
    return newCount
}

async function postTicket(ticketValues, props, newCount){

    try{
        const response = await axios.put(`/${props.ticketToOpen._id}`, 
            {ticketValues: ticketValues}
        )
        const data = Promise.resolve(response)
        data.then(result=>{
            props.updateTicketCount(newCount.currentTickets)
            props.updateTicketToOpen("")
            console.log("Axios put worked")
        })
    }catch(err){
        console.log("update failed", err)
    }
}

function OpenTicket(props){

    console.log("openTicketProps", props)

    const[ticketToOpen, setTicketToOpen] = useState(props.ticketToOpen)

    useEffect(()=>{
        setTicketToOpen(props.ticketToOpen)
    },[props.ticketToOpen])

    if(!(ticketToOpen == "")){

        function mergeTicketWithModel(ticketModel, ticketValues){
            ticketModel.map(element=>{
                ticketValues.map(value =>{
                    if(element.title == value.title){
                        element.value = value.value
                    }
                })
            })
            //console.log("merged ticket model", ticketModel)
            return ticketModel
        }

        ticketValues =[]

        ticketModelWithValues = mergeTicketWithModel(props.ticketModel, props.ticketToOpen.ticketValues)
        //console.log("mergeTicketWihtModel", ticketModelWithValues)

        const handleSubmit = (e) =>{
            e.preventDefault()
            const data = new FormData(e.target)
            const formTicket = Object.entries(Object.fromEntries(data.entries()));
            ticketModelWithValues.map(element =>{
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
            postTicket(ticketValues, props, newCount)
        }

        return(
            <div className="container scrollable">
                <div className="add-ticket-form container border rounded scroll-size-70">
                    <form onSubmit={handleSubmit}>
                        <button className="btn btn-success float-end mb-3" type="submit">
                            Save
                        </button>
                        <button className="btn btn-success float-end mb-3" type="button" onClick={()=>{setTicketToOpen(""); props.updateTicketToOpen("")}}>
                            Close
                        </button>
                        {ticketModelWithValues.map(element =>{
                            console.log("i'm in the JXS")
                            switch(element.inputType){
                                case "textArea":
                                    return(
                                        <TextArea name={element.title} key={element.title} data={element} value={element.value}/>
                                    )
                                    break;
                                case "dropdown":
                                    return(
                                        <Dropdown name={element.title} data={element} key={element.title} value={element.value}/>
                                    )
                                    break;
                                case "smallTextArea":
                                    return(
                                        <SmallTextArea name={element.title} data={element} key={element.title} value={element.value}/>
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
    }else{
        console.log("form closed")
    }
}

export default OpenTicket