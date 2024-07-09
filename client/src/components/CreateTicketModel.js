import React, {useEffect, useState} from "react";
import {useSearchParams } from "react-router-dom";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import './DropdownCustomization.js'
import DropdownCustomization from "./DropdownCustomization.js";
import TextAreaCustomisation from "./TextAreaCustomisation.js"
import TicketPreview from "./TicketPreview.js";
import { readCookie } from "./AddTicket.js";

axios.defaults.baseURL = "http://localhost:3001"

function renderSelectedType(selectedFieldType, ticketModel, updateTicketModel){
    switch(selectedFieldType.inputType){
        case "dropdown":
            return(
                <DropdownCustomization ticketModel={ticketModel} updateTicketModel={updateTicketModel} selectedFieldType={selectedFieldType}/>
            )
            break;
        case "textArea":
            return(
                <TextAreaCustomisation ticketModel={ticketModel} updateTicketModel={updateTicketModel} selectedFieldType={selectedFieldType}/>
            )
            break;
        default:
            console.log("No match for input types")
    }
}

async function saveModel(ticketModel, setTicketModel, workspaceID){
    const response = await axios.put(`/update-workspace-model/?workspace=${workspaceID}`,{
        newTicketModel: ticketModel
    },{
        headers:{
            Authorization: readCookie('token')
        }
    })
    const data = Promise.resolve(response)
    data.then(result=>{
        console.log("ticket model from response", response)
        setTicketModel(response.data.ticketModel)
    })
}

function CreateTicketModel({receivedWorkspace}){

    const[searchParam, setSearchParam] = useSearchParams()
    const[ticketModel, setTicketModel] = useState(receivedWorkspace.ticketModel)
    const[selectedFieldType, setSelectedFieldType] = useState({
        inputType: "dropdown",
        title: ""
    })
    const workspaceID = searchParam.get('workspace')
    const ticketModelClone = structuredClone(ticketModel)
    const selectedFieldTypeClone = structuredClone(selectedFieldType)

    function updateTicketModel(newModel){
        setTicketModel(newModel)
    }

    function updateSelectedFieldType(newFieldType){
        setSelectedFieldType(newFieldType)
    }

    console.log("ticketModel in create tiket model", ticketModelClone)

    return(
        <div className="container">
            <h3>Here you select and customize every field</h3>
            <button onClick={()=>saveModel(ticketModel, setTicketModel, workspaceID)}>Save model</button>
            <button value="dropdown" onClick={()=>setSelectedFieldType({inputType: "dropdown", title:""})}>Add dropdown</button>
            <button value="textArea" onClick={()=>setSelectedFieldType({inputType: "textArea", title:""})}>Add text input</button>
            <div className="container">
                {renderSelectedType(selectedFieldTypeClone, ticketModelClone, updateTicketModel)}
                <TicketPreview ticketModel={ticketModelClone} updateSelectedFieldType={updateSelectedFieldType} updateTicketModel={updateTicketModel}/>
            </div>
        </div>
    )
    
}

export default CreateTicketModel