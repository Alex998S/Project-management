import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/main.sass'

function SmallTextArea(props){

    return(
        <div className="mb-3">
            <div className="input-group">
                {/* <span className="input-group-text" id="basic-addon3">{props.name}</span> */}
                <textarea name={props.name} type="text" className="input-form" id="basic-url" aria-describedby="basic-addon3 basic-addon4" defaultValue={props.value} placeholder={props.name}></textarea>
            </div>
        </div>
    )
}

export default SmallTextArea