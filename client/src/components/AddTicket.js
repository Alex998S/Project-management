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

function AddTicketForm(props){

    return(
        <div className="container scrollable">
            <div className="add-ticket-form container border rounded scroll-size-60">
                {ticketModel.map(element =>{
                    switch(element.inputType){
                        case "textArea":
                            return(
                                <TextArea props={element}/>
                            )
                            break;
                        case "dropdown":
                            return(
                                <Dropdown props={element}/>
                            )
                            break;
                        case "smallTextArea":
                            return(
                                <SmallTextArea props={element}/>
                            )
                        default:
                            console.log("No match for input types")
                    }
                })}
            </div>
        </div>
    )
}

function AddTicket(props){

    let show = props.props

    if(show){
        return(
            AddTicketForm()
        )
    }

}

export default AddTicket