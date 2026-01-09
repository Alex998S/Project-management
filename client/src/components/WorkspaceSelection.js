import React, {useState, setState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/main.sass'
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
            <input className="input-form" id="create" name="add-workspace" value={newWorkspaceName} onChange={handleInputChange} placeholder="Workspace name"></input>
            <button type="button" className="workspace-button" onClick={()=>addWorkspace(newWorkspaceName, userID, goToPage)}>
                <span>Add workspace</span>
            </button>
        </div>
    

    //create html only when login response has workspaces
    if(workspaces != undefined && workspaces.length !=0){
        console.log("show workspaces", workspaces)
        return(
            <div className="available-workspaces  border border-primary rounded-1">
                <h3 className="welcome-title">Available workspaces</h3>
                <div className="available-workspaces-container">
                    {workspaces.map(element =>{
                        return(
                            <button type="button" className="workspace-button" name="workspace" onClick={()=>goToPage(element._id)}>
                                <span>{element.name}</span>
                            </button>
                        )
                    })}
                    <button type="button" className="workspace-button" onClick={()=>setShowWorkspaceInput(true)} name="add-workspace">
                        <span>Create new workspace</span>
                    </button>
                    {showWorkspaceInput ? createWorkspaceField: null}
                </div>
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













