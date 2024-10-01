import React, {useState, setState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/main.sass'

function TextArea(props){

    console.log("Text area", props)

    return(
        <div className="col-12">
            <h4>{props.name}</h4>
            <textarea name={props.name} className="form-control" aria-label="With textarea" defaultValue={props.value}></textarea>
        </div>
    )
}

export default TextArea













