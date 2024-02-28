import React from "react";
import { Route, Routes } from "react-router-dom";
//import Ticket from './Ticket.js'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle'
import '../stylesheets/ticket.sass'
import TicketsPage from "./TicketsPage.js";
import DashboardPage from "./DashboardPage.js";
import WelcomePage from "./WelcomePage.js";
import SignInPage from "./SignInPage.js";
import SignUpPage from "./SignUpPage.js";

function App(){
    return(
        <Routes>
            <Route path="/tickets" element={<TicketsPage/>}></Route>
            <Route path="/dashboard" element={<DashboardPage/>}></Route>
            <Route path="/" element={<WelcomePage/>}></Route>
            <Route path="/signin" element={<SignInPage/>}></Route>
            <Route path="/signup" element={<SignUpPage/>}></Route>
        </Routes>
    )
}

export default App;