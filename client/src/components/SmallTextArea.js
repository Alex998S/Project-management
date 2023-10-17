import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

function SmallTextArea({props:props}){

    return(
        <div className="mb-3">
            <div className="input-group">
                <span className="input-group-text" id="basic-addon3">{props.title}</span>
                <input name={props.title} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4"></input>
            </div>
        </div>
    )
}

export default SmallTextArea