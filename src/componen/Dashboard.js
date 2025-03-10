import Header from "./Header";
import React,{ useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

function Dashboard(){


    return (
        <>
            <Header/>
            <div className="d-flex mt-5">
            <SideBar/>
            <div className="container flex-grow-1">
            <h1 className="text-center">DashBoard</h1>
            </div>
            </div>
        </>
    )
}
export default Dashboard;