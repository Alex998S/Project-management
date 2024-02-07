import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

function DatePicker(props){

    return(
        <div className="mb-3">
            <label className="form-label dropdown-title" id="basic-addon3" for={props.name}>{props.name}</label>
            <input name={props.name} type="date" id={props.name}></input>
        </div>
    )
}

export default DatePicker