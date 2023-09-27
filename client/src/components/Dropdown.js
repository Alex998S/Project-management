import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'

function Dropdown({props:props}){

    console.log(props.list)

    const[showList, setShowList] = useState(false)
    const[dropdownValue, setDropdownValue] = useState(props.dropDownName)

    return(
        <div className="dropdown">
            <button onClick={()=>setShowList(dropdownVisible(showList))} className="btn btn-primary dropdown-toggle show my-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {dropdownValue}
            </button>
            <ul className={"dropdown-menu" + (showList ? ' show' : '')}>
                {props.list.map(element =>{
                    return(
                        <li><button onClick={()=>{setDropdownValue(element); setShowList(false)}} className="dropdown-item">{element}</button></li>
                    )
                })}
            </ul>
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

