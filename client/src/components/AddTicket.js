import React, {useState, userState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'


function AddTicket(props){

    let[show, setShow] = useState(props.props)

    setShow = props.props

    console.log("add ticket console", props.props)

    if(setShow){
        return(
            <div style={{display:'block',position: 'absolute', margin: '300px'}}>Show ME</div>
        );
    }else{
        return(
            <div style={{display:'block',position: 'absolute', margin: '300px'}}>Not visible</div>
        )
    }

}

export default AddTicket