import React, {useState, setState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/ticket.sass'

function WorkspaceSelection({workspaces}){

    if(workspaces != undefined && workspaces.length !=0){
        console.log("show workspaces", workspaces)
        return(
            <div>
                <h4>{workspaces[0].name}</h4>
            </div>
        )
    }
}

export default WorkspaceSelection













