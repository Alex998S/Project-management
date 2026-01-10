import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/main.sass'


function displayOptions(props, showList, setDropdownValue, setShowList, searchKey, handleChange){

    let defaultOptions = []

    let options = []

    let filteredOptions = []

    if(props.data.dynamic == true){

        let dynamicArrayName = props.data.options

        defaultOptions = props.dynamicFields[dynamicArrayName]
    }else{
        defaultOptions = props.data.options
    }

    if(Object.hasOwn(defaultOptions[0], '_id')){
        defaultOptions.map(element=>{
            element.displayName = `${element.first_name} ${element.last_name}`
            options.push(element)
        })
    }else{
        defaultOptions.map(element=>{
            let object = {
                displayName: element
            }
            options.push(object)
        })
    }

    console.log("options in dropdown", options)

    if(searchKey != ""){
        options.map(element=>{
            let elementValue = element.displayName
            let valueToLowerCase = elementValue.toLowerCase()
            if(valueToLowerCase.includes(searchKey.toLowerCase())){
                filteredOptions.push(element)
            }
        })
    }else{
        filteredOptions = options
    }

    console.log("in dropdown, filteredOptions", filteredOptions)

    return(
        <ul className={"dropdown-menu" + (showList ? ' show' : '')} >
            <input type="text" className="input-form" placeholder="Search..." value={searchKey} onChange={handleChange}></input>
            {filteredOptions.map(element =>{
                return(
                    <li><button type="button" key={element.displayName} onClick={()=>{setDropdownValue(element.displayName); setShowList(false)}} className="dropdown-item">{element.displayName}</button></li>
                )
            })}
        </ul>
    )
    
}


function Dropdown(props){

    const[showList, setShowList] = useState(false)
    const[dropdownValue, setDropdownValue] = useState(props.value)
    const[searchKey, setSearchKey] = useState("")

    const handleChange = (e) =>{
        setSearchKey(e.target.value)
    }

    return(
        <div className="col d-flex flex-column m-3">
            <label className="form-label dropdown-title d-flex justify-content-center" id="basic-addon3" htmlFor={props.name}>{props.name}</label>
            <div className="dropdown justify-content-center">
                <input className="input-form" id={props.name} name={props.name} style={{display: "none"}} 
                    value={dropdownValue}
                />
                <button name={props.name} key={props.name} onClick={()=>setShowList(dropdownVisible(showList))} className="input-dropdown border border-secondary-subtle rounded-1 justify-content-left" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {dropdownValue}
                </button>
                {displayOptions(props, showList, setDropdownValue, setShowList, searchKey, handleChange)}
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


{/* <div class="dropdown">
  <button onclick="myFunction()" class="dropbtn">Dropdown</button>
  <div id="myDropdown" class="dropdown-content">
    <input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">
    <a href="#about">About</a>
    <a href="#base">Base</a>
    <a href="#blog">Blog</a>
    <a href="#contact">Contact</a>
    <a href="#custom">Custom</a>
    <a href="#support">Support</a>
    <a href="#tools">Tools</a>
  </div>
</div> */}
