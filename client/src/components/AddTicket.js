import React, {useState} from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import Dropdown from "./Dropdown.js";
import TextArea from "./TextArea.js";

axios.defaults.baseURL = "http://localhost:3001"

const response = await axios.get("/create-ticket")
const ticketModel = response.data[0].ticketModel

function AddTicketForm(props){

    return(
        <div className="add-ticket-form container border rounded">
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
                    default:
                        console.log("No match for input types")
                }
            })}
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