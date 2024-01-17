import React, {useState, setState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/ticket.sass'

function TextArea(props){
    return(
        <div>
            <h4>{props.name}</h4>
            <textarea name={props.name} className="form-control" inputType="textArea" aria-label="With textarea">{props.value}</textarea>
        </div>
    )
}

export default TextArea













