import React from "react";
//import Ticket from './Ticket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import TicketListHolder from '../components/TicketListHolder.js'
import LeftSideMenu from '../components/LeftSideMenu.js'

function TicketsPage(){
    return(
        <div>
            {/* <TopNavigationBar/> */}
            <div className="main-container row border border-5">
                <LeftSideMenu/>
                <TicketListHolder/>
            </div>
        </div>
        
    )
}

export default TicketsPage;