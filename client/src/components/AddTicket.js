import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

function AddTicketForm(){

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
            <div className="dropdown">
                <button onClick={()=>setShowList(dropdownVisible(showList))} className="btn btn-primary dropdown-toggle show my-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {dropdownValue}
                </button>
                <ul className={"dropdown-menu" + (showList ? ' show' : '')}>
                    <li><button onClick={()=>{setDropdownValue('Bug fix'); setShowList(false)}} className="dropdown-item">Bug fix</button></li>
                    <li><button onClick={()=>{setDropdownValue('Daily'); setShowList(false)}}  className="dropdown-item">Daily</button></li>
                    <li><button onClick={()=>{setDropdownValue('Maintenance'); setShowList(false)}}  className="dropdown-item">Maintenance</button></li>
                </ul>
            </div>
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