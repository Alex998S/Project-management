import React, {useEffect, useState} from "react";
import {useSearchParams } from "react-router-dom";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import './DropdownCustomization.js'
import DropdownCustomization from "./DropdownCustomization.js";
import TicketPreview from "./TicketPreview.js";

axios.defaults.baseURL = "http://localhost:3001"

function renderSelectedType(selectedType){
    switch(selectedType){
        case "none":
            return(
                <DropdownCustomization/>
            )
            break;
        default:
            console.log("No match for input types")
    }
}

function CreateTicketModel({receivedWorkspace}){

    const[selectedType, setSelectedType] = useState("none")

    console.log("in create ticket model", receivedWorkspace)

    return(
        <div className="container">
            <h3>Here you select and customize every field</h3>
            <div className="container">
                {renderSelectedType(selectedType)}
                <TicketPreview ticketModel={receivedWorkspace.ticketModel}/>
            </div>
        </div>
    )
    
}

export default CreateTicketModel