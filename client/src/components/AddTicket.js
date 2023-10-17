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

    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = new FormData(e.target)
        console.log("this is the new ticket", Object.fromEntries(data.entries()))
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

function AddTicket(props){

    let show = props.props

    if(show){
        return(
            AddTicketForm()
        )
    }

}

export default AddTicket