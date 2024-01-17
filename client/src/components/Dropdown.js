import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

function Dropdown(props){

    const[showList, setShowList] = useState(false)
    const[dropdownValue, setDropdownValue] = useState(props.value)

    return(
        <div className="mb-3">
            <div className="input-group">
                <span className="input-group-text dropdown-title" id="basic-addon3">{props.title}</span>
                <div className="dropdown">
                    <input name={props.name} style={{display: "none"}}
                        value={dropdownValue}
                    />
                    <button name={props.name} onClick={()=>setShowList(dropdownVisible(showList))} className="btn btn-primary dropdown-toggle show my-dropdown" inputType="dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {dropdownValue}
                    </button>
                    <ul className={"dropdown-menu" + (showList ? ' show' : '')}>
                        {props.data.options.map(element =>{
                            return(
                                <li><button type="button" onClick={()=>{setDropdownValue(element); setShowList(false)}} className="dropdown-item">{element}</button></li>
                            )
                        })}
                    </ul>
                </div>
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

