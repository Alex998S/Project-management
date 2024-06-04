import React, {useState, setState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/ticket.sass'
import axios from 'axios'
import { useNavigate} from "react-router-dom";
import {readCookie} from './AddTicket.js'

axios.defaults.baseURL = "http://localhost:3001"

function WorkspaceSelection({userID, workspaces}){

    const [showWorkspaceInput, setShowWorkspaceInput] = useState(false)
    const[newWorkspaceName, setNewWorkspaceName] = useState('')

    let createWorkspaceField

    const navigate = useNavigate()

    //set the state = text from field
    const handleInputChange = (event) => {
        setNewWorkspaceName(event.target.value);
      };

     //navigate to the tickets page 
    function goToPage(workspaceID){
        navigate({
            pathname: '/tickets',
            search: `?workspace=${workspaceID}`
        })
    }

    createWorkspaceField = 
        <div className="mb-3">
            <label for="create" className="form-label">Name</label>
            <input className="form-control" id="create" name="add-workspace" value={newWorkspaceName} onChange={handleInputChange}></input>
            <button type="button" onClick={()=>addWorkspace(newWorkspaceName, userID, goToPage)}>Add</button>
        </div>
    

    //create html only when login response has workspaces
    if(workspaces != undefined && workspaces.length !=0){
        console.log("show workspaces", workspaces)
        return(
            <div className="container">
                {workspaces.map(element =>{
                    return(
                        <button type="button" name="workspace" onClick={()=>goToPage(element._id)}>{element.name}</button>
                    )
                })}
                <button type="button" onClick={()=>setShowWorkspaceInput(true)} name="add-workspace">Create new workspace</button>
                {showWorkspaceInput ? createWorkspaceField: null}
            </div>
        )
    }
}

// creates a new workspace
async function addWorkspace(newWorkspaceName, userID, goToPage){
    const response = await axios.put(`/users/add-new-workspace/${userID}`,{
        name: newWorkspaceName
    },{
        headers:{
            Authorization: readCookie('token')
        }
    })
    goToPage(response.data)
}

export default WorkspaceSelection













