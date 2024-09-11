import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/main.sass'

//let newField = {}
let fieldToReplace = ""

function displayOptions(newField, dynamicFields, removeOption){
    console.log("displayOptons parameters", newField, "and dynamicFields", dynamicFields)
    if(newField.dynamic == true){

        let dynamicArrayName = newField.options

        let options = dynamicFields[dynamicArrayName]

        console.log('displayOptions', options)

        console.log("[Dropdown]==options", options)

        return(
            <div className="container">
                {options.map(element =>{
                    if(Object.hasOwn(element, '_id')){
                        console.log("with ID", element)
                        return(
                            <div className="border" key={element._id}>
                                <p>{`${element.first_name} ${element.last_name}`}</p>
                                <button className="btn-close btn-sm" value={`${element.first_name} ${element.last_name}`} onClick={()=>removeOption(newField, `${element.first_name} ${element.last_name}`)}></button>
                            </div>
                        )
                    }else{
                        console.log("without ID", element)
                        return(
                            <div className="border" key={element}>
                                <p>{element}</p>
                                <button className="btn-close btn-sm" value={element} onClick={()=>removeOption(newField, element)}></button>
                            </div>
                        )
                    }
                    
                })}
            </div>
        )
    }else{
        return(
            <div className="">
                {newField.options.map(element =>{
                    return(
                        <div className="border">
                            <p>{element}</p>
                            <button className="btn-close btn-sm" value={element} onClick={()=>removeOption(newField, element)}></button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

function DropdownCustomization({ticketModel, updateTicketModel, selectedFieldType, dynamicFields}){

    console.log("[DropdownCustomisation]==ticketModel", ticketModel)
    console.log("[DropdownCustomisation]==selectedFieldType", selectedFieldType)
    console.log("[DropdownCustomisation]==dynamicFields", dynamicFields)

    const[currentField, setCurrentField] = useState(selectedFieldType)

    let newField = structuredClone(currentField)

    if(currentField.title !== null){
        fieldToReplace = selectedFieldType.title
    }

    useEffect(()=>{
        setCurrentField(selectedFieldType)
    },[selectedFieldType])

    if(newField.options ==  null){
        newField.options = []
    }

    const updateFieldTitle = (event) =>{
        newField.title = event.target.value
    }

    const updateOptionToAdd = (event) =>{
        newField.optionToAdd = event.target.value
    }

    function addOption(newField){
        newField.options.push(newField.optionToAdd)
        delete newField.optionToAdd
        setCurrentField(newField)
    }

    function addUserList(newField, users){
        newField.options = users
        setCurrentField(newField)
    }

    // const removeOption = (event) =>{
    //     const optionToRemove = event.target.getAttribute('value')
    //     const index = newField.options.findIndex(element => element === optionToRemove);

    //     if (index !== -1) {
    //         newField.options.splice(index, 1);
    //     }
        
    //     setCurrentField(newField)
    // }

    function removeOption(newField, optionToRemove){
        //const optionToRemove = event.target.getAttribute('value')
        const index = newField.options.findIndex(element => element === optionToRemove);

        if (index !== -1) {
            newField.options.splice(index, 1);
        }
        
        setCurrentField(newField)
    }

    function createNewTicketModel(ticketModel, newField, fieldToReplace){

        if(fieldToReplace !== ""){
            ticketModel.map(element=>{
                if(element.title === fieldToReplace){
                    element.inputType = newField.inputType
                    element.title = newField.title
                    element.options = newField.options
                    
                }
            })
            return ticketModel
        }else{
            newField.canBeRemoved = true
            newField.static = true
            newField.hardcodedTitle = ""
            newField.dynamic = false
            newField.modifiableOptions = true
            ticketModel.push(newField)
            return ticketModel
        }
    }


    return(
        <div className="container mt-3">
        <button className="btn btn-success float-end mb-3" type="submit" value="submit" onClick={()=>updateTicketModel(createNewTicketModel(ticketModel, newField, fieldToReplace))}>Save field</button>
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
                {displayOptions(newField, dynamicFields, removeOption)}
            </div>
        </div>
    )
}

export default DropdownCustomization