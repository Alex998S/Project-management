import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

let newField = {}

function DropdownCustomization({ticketModel, updateTicketModel, selectedFieldType}){

    console.log("dropDownCustomisation", selectedFieldType)

    if(selectedFieldType.options == null){
        selectedFieldType.options = []
    }

    const updateFieldTitle = (event) =>{
        newField.title = event.target.value
        console.log("new field title", newField)
    }

    return(
        <div className="container">
            <div className="container">
                <p>Title:</p>
                <textarea type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" defaultValue={selectedFieldType.title} onChange={updateFieldTitle}></textarea>
            </div>
            <div className="container">
                <p>Add options</p>
                <textarea className="form-control" aria-label="With textarea"></textarea>
            </div>
            <div className="container">
            <p>Options:</p>
                {selectedFieldType.options.map(element=>{
                    return(
                        <div className="border">
                            <p>{element}</p>
                            <button className="btn-close btn-sm"></button>
                        </div>
                    )
                })}
            </div>
        </div>
    )

    

}

export default DropdownCustomization