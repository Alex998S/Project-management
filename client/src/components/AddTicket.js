import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

function addTicketForm(){
    return(
        <div className="in-front container border rounded">
            <div class="input-group">
                <h4>Add title</h4>
                {/* <span class="input-group-text">With textarea</span> */}
                <textarea class="form-control" aria-label="With textarea"></textarea>
            </div>
            <div class="input-group">
                <h4>Add description</h4>
                {/* <span class="input-group-text">With textarea</span> */}
                <textarea class="form-control" aria-label="With textarea"></textarea>
            </div>
        </div>
    )
}

function AddTicket(props){

    let show = props.props

    console.log("add ticket console", props.props)

    if(!show){
        return(
            addTicketForm()
        )
        
    }

}

export default AddTicket