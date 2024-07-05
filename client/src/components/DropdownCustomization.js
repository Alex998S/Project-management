import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

//let newField = {}

function DropdownCustomization({ticketModel, updateTicketModel, selectedFieldType}){

    const[currentField, setCurrentField] = useState(selectedFieldType)

    console.log("selected field at start", selectedFieldType)
    console.log("current field at start", currentField)

    let newField = structuredClone(currentField)

    console.log("current field at start", currentField)

    console.log("new field at start", newField)

    useEffect(()=>{
        setCurrentField(selectedFieldType)
    },[selectedFieldType])

    if(newField.options ==  null){
        newField.options = []
    }

    const updateFieldTitle = (event) =>{
        newField.title = event.target.value
        console.log("new field title", newField)
    }

    const updateOptionToAdd = (event) =>{
        newField.optionToAdd = event.target.value
        console.log("new field title", newField)
    }

    function addOption(newField){
        newField.options.push(newField.optionToAdd)
        delete newField.optionToAdd
        console.log("called new type")
        setCurrentField(newField)
    }

    return(
        <div className="container">
            <div className="container">
                <p>Title:</p>
                <textarea type="text" name="title" key={newField.title} className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" defaultValue={newField.title} onChange={updateFieldTitle}></textarea>
            </div>
            <div className="container">
                <p>Add options</p>
                <textarea type="text" className="form-control" defaultValue="" key="option" id="basic-url" aria-describedby="basic-addon3 basic-addon4" onChange={updateOptionToAdd}></textarea>
                <button className="btn btn-primary float-end mb-3" type="submit" value="smallTextArea" onClick={()=>{addOption(newField)}}>Add</button>
            </div>
            <div className="container">
            <p>Options:</p>
                {newField.options.map(element=>{
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