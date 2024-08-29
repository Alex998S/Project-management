import React, {useEffect, useState} from "react";

import 'bootstrap/dist/css/bootstrap.css'

import '../stylesheets/ticket.sass'
import Dropdown from "./Dropdown.js";
import TextArea from "./TextArea.js";
import SmallTextArea from './SmallTextArea.js'
import DatePicker from "./DatePicker.js";


let ticketValues = []
let newCount



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


function TicketPreview(props){

    const currentFieldTypes = structuredClone(props.ticketModel)

    //const[currentFiledTypes, setCurrenctFiledTypes] = useState(props.ticketModel)

    const handleDeleteField = (event) =>{
        props.updateTicketModel(currentFieldTypes.filter(function(e){return e.title !== event.target.value}))
        //setCurrenctFiledTypes(currentFiledTypes.filter(function(e){return e.title !== event.target.value}))
    }

    const handleEditField = (event) =>{
        props.updateSelectedFieldType(currentFieldTypes.find(e => e.title === event.target.value))
    }

    return(
        <div className="container scrollable col-12">
            <div className="add-ticket-form container border rounded scroll-size-70">
                <form>
                    {currentFieldTypes.map(element =>{
                        switch(element.inputType){
                            case "textArea":
                                return(
                                    <div className="border border-primary">
                                        <button value={element.title} type="button" className="btn btn-danger" aria-label="Close" onClick={handleDeleteField}>Delete</button>
                                        <button value={element.title} type="button" className="btn btn-warning" aria-label="Edit" onClick={handleEditField}>Edit</button>
                                        <TextArea name={element.title} key={element.title} data={element} value=""/>
                                    </div>
                                    
                                )
                                break;
                            case "dropdown":
                                return(
                                    <div className="border border-primary">
                                       <button value={element.title} type="button" className="btn btn-danger" aria-label="Close" onClick={handleDeleteField}>Delete</button>
                                       <button value={element.title} type="button" className="btn btn-warning" aria-label="Edit" onClick={handleEditField}>Edit</button>
                                        <Dropdown name={element.title} data={element} key={element.title} value="" users={props.users} dynamicFields={props.dynamicFields}/>
                                    </div>
                                    
                                )
                                break;
                            case "smallTextArea":
                                return(
                                    <div className="border border-primary">
                                        <button value={element.title} type="button" className="btn btn-danger" aria-label="Close" onClick={handleDeleteField}>Delete</button>
                                        <button value={element.title} type="button" className="btn btn-warning" aria-label="Edit" onClick={handleEditField}>Edit</button>
                                        <DatePicker name={element.title} data={element} key={element.title} value=""/>
                                    </div>
                                    
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

export default TicketPreview