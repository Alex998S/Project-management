import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import Dropdown from "./Dropdown.js";

function AddTicketForm(props){

    const[showList, setShowList] = useState(false)
    const[dropdownValue, setDropdownValue] = useState('Select type')

    return(
        <div className="add-ticket-form container border rounded">
            <div>
                <h4>Title</h4>
                {/* <span className="input-group-text">With textarea</span> */}
                <textarea className="form-control" aria-label="With textarea"></textarea>
            </div>
            <div>
                <h4>Description</h4>
                {/* <span className="input-group-text">With textarea</span> */}
                <textarea className="form-control" aria-label="With textarea"></textarea>
            </div>
            <Dropdown props={{dropDownName: "Type", list:['Bug fix', 'Maintenance', 'Daily']}}/>
            <Dropdown props={{dropDownName: "Status", list:['New', 'In Progress', 'QA', 'Done', 'Suspended']}}/>
            {/* now added */}
        </div>
    )
}

function dropdownVisible(parm){
    if(parm){
        return false
    }else{
        return true
    }
}

function AddTicket(props){

    let show = props.props

    console.log("add ticket console", props.props)

    if(show){
        return(
            AddTicketForm()
        )
    }

}

export default AddTicket