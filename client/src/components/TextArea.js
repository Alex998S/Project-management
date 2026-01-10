import React, {useState, setState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/main.sass'

function TextArea({element}){

    console.log("Text area", element)

    return(
        <div className="col-12">
            <textarea name={element.title} className="input-form border border-bottom-1 rounded-1" aria-label="With textarea" defaultValue={element.value} placeholder={element.title}></textarea>
        </div>
    )
}

export default TextArea













