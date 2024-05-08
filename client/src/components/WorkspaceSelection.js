import React, {useState, setState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/ticket.sass'
import axios from 'axios'
import { useNavigate} from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3001"

function WorkspaceSelection({userID, workspaces}){

    const [showWorkspaceInput, setShowWorkspaceInput] = useState(false)
    const[newWorkspaceName, setNewWorkspaceName] = useState('')

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        setNewWorkspaceName(event.target.value);
      };

    function goToPage(workspaceID){
        navigate({
            pathname: '/tickets',
            search: `?workspace=${workspaceID}`
        })
    }

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
                {showWorkspaceInput ? (
                    <div className="mb-3">
                        <label for="create" className="form-label">Name</label>
                        <input className="form-control" id="create" name="add-workspace" value={newWorkspaceName} onChange={handleInputChange}></input>
                        <button type="button" onClick={()=>addWorkspace(newWorkspaceName, userID)}></button>
                    </div>): null}
            </div>
        )
    }
}

async function addWorkspace(newWorkspaceName, userID){
    const response = await axios.put(`/add-new-workspace/${userID}`,{
        
    })
}

export default WorkspaceSelection













