import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'


function AddTicket(props){

    let show = props.props

    console.log("add ticket console", props.props)

    if(show){
        return(
            <div style={{display:'block',position: 'absolute', margin: '300px', backgroundColor: 'blue', zIndex: '-10'}}>Show ME</div>
        );
    }else{
        return(
            <div style={{display:'block',position: 'absolute', margin: '300px', backgroundColor: 'blue', zIndex: '-1'}}>Not visible</div>
        )
    }

}

export default AddTicket