import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/main.sass'

function displayOptions(props, showList, setDropdownValue, setShowList){
    if(props.data.dynamic == true){

        let dynamicArrayName = props.data.options

        let options = props.dynamicFields[dynamicArrayName]

        console.log("[Dropdown]==options", options)
        return(
            <ul className={"dropdown-menu" + (showList ? ' show' : '')} >
                    {options.map(element =>{
                        if(Object.hasOwn(element, '_id')){
                            console.log("with ID", element)
                            return(
                                <li><button type="button" key={element._id} onClick={()=>{setDropdownValue(`${element.first_name} ${element.last_name}`); setShowList(false)}} className="dropdown-item">{`${element.first_name} ${element.last_name}`}</button></li>
                            )
                        }else{
                            console.log("without ID", element)
                            return(
                                <li><button type="button" key={element} onClick={()=>{setDropdownValue(element); setShowList(false)}} className="dropdown-item">{element}</button></li>
                            )
                        }
                        
                    })}
            </ul>
        )
    }else{
        return(
            <ul className={"dropdown-menu" + (showList ? ' show' : '')} >
                {props.data.options.map(element =>{
                    return(
                        <li><button type="button" key={element} onClick={()=>{setDropdownValue(element); setShowList(false)}} className="dropdown-item">{element}</button></li>
                    )
                })}
            </ul>
        )
        
    }
}

function Dropdown(props){

    const[showList, setShowList] = useState(false)
    const[dropdownValue, setDropdownValue] = useState(props.value)

    console.log("[Dropdown]==props", props)

    return(
        <div className="mb-3">
            <label className="form-label dropdown-title" id="basic-addon3" htmlFor={props.name}>{props.name}</label>
            <div className="dropdown">
                <input id={props.name} name={props.name} style={{display: "none"}} 
                    value={dropdownValue}
                />
                <button name={props.name} key={props.name} onClick={()=>setShowList(dropdownVisible(showList))} className="btn btn-primary dropdown-toggle show my-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {dropdownValue}
                </button>
                {displayOptions(props, showList, setDropdownValue, setShowList)}
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

