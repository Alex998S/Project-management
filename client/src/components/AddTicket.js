import React, {useState} from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import Dropdown from "./Dropdown.js";
import TextArea from "./TextArea.js";
import SmallTextArea from './SmallTextArea.js'

axios.defaults.baseURL = "http://localhost:3001"

const response = await axios.get("/create-ticket")
const ticketModel = response.data[0].ticketModel
let ticketValues = []

function setNewState(oldCount){
    let newCount = oldCount + 1
    return newCount
}

function AddTicket(props){

    //console.log(props)

    let show = props.props

    if(show){
        // return(
            
        //     AddTicketForm(props.ticketCount, props)
        // )
        ticketValues =[]

        const handleSubmit = (e) =>{
            e.preventDefault()
            const data = new FormData(e.target)
            const formTicket = Object.entries(Object.fromEntries(data.entries()));
            ticketModel.map(element =>{
                let value;
                formTicket.map(key =>{
                    if(element.title == key[0]){
                        value = key[1]
                    }
                })
                element.value = value
                ticketValues.push(element)
            })
            //console.log("ticket to be posted", ticketValues)
            axios.post("/", {
                ticketValues: ticketValues
            })

            const newCount ={...props}
            newCount.currentTickets = newCount.currentTickets + 1
            //console.log("clone", clone);
            props.updateTicketCount(newCount.currentTickets)
        }

        return(
            <div className="container scrollable">
                <div className="add-ticket-form container border rounded scroll-size-60">
                    <form onSubmit={handleSubmit}>
                        <button className="btn btn-success float-end mb-3" type="submit">
                            Save
                        </button>
                        {ticketModel.map(element =>{
                            switch(element.inputType){
                                case "textArea":
                                    return(
                                        <TextArea name={element.title} key={element.title} props={element} value=""/>
                                    )
                                    break;
                                case "dropdown":
                                    return(
                                        <Dropdown name={element.title} props={element} key={element.title} value=""/>
                                    )
                                    break;
                                case "smallTextArea":
                                    return(
                                        <SmallTextArea name={element.title} props={element} key={element.title} value=""/>
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