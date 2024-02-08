import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

function Dropdown(props){

    const[showList, setShowList] = useState(false)
    const[dropdownValue, setDropdownValue] = useState(props.value)

    return(
        <div className="mb-3">
            <label className="form-label dropdown-title" id="basic-addon3" htmlFor={props.name}>{props.name}</label>
            <div className="dropdown">
                <input id={props.name} name={props.name} style={{display: "none"}} 
                    defaultValue={dropdownValue}
                />
                <button name={props.name} key={props.name} onClick={()=>setShowList(dropdownVisible(showList))} className="btn btn-primary dropdown-toggle show my-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {dropdownValue}
                </button>
                <ul className={"dropdown-menu" + (showList ? ' show' : '')} >
                    {props.data.options.map(element =>{
                        return(
                            <li><button type="button" key={element} onClick={()=>{setDropdownValue(element); setShowList(false)}} className="dropdown-item">{element}</button></li>
                        )
                    })}
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

export default Dropdown

