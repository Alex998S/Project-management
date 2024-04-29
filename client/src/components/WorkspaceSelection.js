import React, {useState, setState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/ticket.sass'
import { useNavigate} from "react-router-dom";

function WorkspaceSelection({workspaces}){

    const navigate = useNavigate()

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
            </div>
        )
    }
}

export default WorkspaceSelection













