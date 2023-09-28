import React, {useState, setState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/ticket.sass'

function TextArea({props:props}){
    return(
        <div>
            <h4>{props.title}</h4>
            <textarea className="form-control" aria-label="With textarea"></textarea>
        </div>
    )
}

export default TextArea













