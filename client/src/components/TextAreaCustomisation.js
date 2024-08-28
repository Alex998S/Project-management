import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

let newField = {}
let fieldToReplace = ""

function createNewTicketModel(ticketModel, newField, fieldToReplace){

    if(fieldToReplace !== ""){
        ticketModel.map(element=>{
            if(element.title === fieldToReplace){
                element.title = newField.title
                element.inputType = newField.inputType
            }
        })
        return ticketModel
    }else{
        newField.canBeRemoved = true
        newField.hardcodedTitle = ""
        ticketModel.push(newField)
        return ticketModel
    }
}

function TextAreaCustomization({ticketModel, updateTicketModel, selectedFieldType}){
    


    if(selectedFieldType.title !== null){
        fieldToReplace = selectedFieldType.title
    }

    const updateFieldTitle = (event) =>{
        newField.title = event.target.value
    }

    const updateFieldType = (event) =>{
        newField.inputType = event.target.value
    }

    return(
        <div className="container">
            <p>Title:</p>
            <textarea type="text" name="title" key={selectedFieldType.title} defaultValue={selectedFieldType.title} className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" onChange={updateFieldTitle}></textarea>
            <p>Select input type</p>
            <button className="btn btn-primary float-end mb-3" type="submit" value="smallTextArea" onClick={updateFieldType}>Small</button>
            <button className="btn btn-primary float-end mb-3" type="submit" value="textArea" onClick={updateFieldType}>Large</button>
            <button className="btn btn-success float-end mb-3" type="submit" value="submit" onClick={()=>updateTicketModel(createNewTicketModel(ticketModel, newField, fieldToReplace))}>Save field</button>
        </div>
    )

}

export default TextAreaCustomization