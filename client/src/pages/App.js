import React from "react";
//import Ticket from './Ticket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import TicketsPage from "./TicketsPage.js";
import DashboardPage from "./DashboardPage.js";
import { Route, Routes } from "react-router-dom";

function App(){
    return(
        <Routes>
            <Route path="/" element={<TicketsPage/>}></Route>
            <Route path="/dashboard" element={<DashboardPage/>}></Route>
        </Routes>
    )
}

export default App;