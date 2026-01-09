import React, {useState, setState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/main.sass'

function TextArea({element}){

    console.log("Text area", element)

    return(
        <div className="col-12">
            <h4>{element.title}</h4>
            <textarea name={element.title} className="form-control" aria-label="With textarea" defaultValue={element.value}></textarea>
        </div>
    )
}

export default TextArea













