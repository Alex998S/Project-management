import React, {useState, setState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/main.sass'

function TextArea(props){

    return(
        <div>
            <textarea name={props.name} className="input-form border border-bottom-1 rounded-1" aria-label="With textarea" defaultValue={props.value} placeholder={props.name}></textarea>
        </div>
    )
}

export default TextArea













