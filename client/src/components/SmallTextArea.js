import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

function SmallTextArea({props:props}){

    return(
        <div class="mb-3">
            <label for="basic-url" class="form-label">Your vanity URL</label>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon3">{props.title}</span>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4"></input>
            </div>
        </div>
    )
}

export default SmallTextArea