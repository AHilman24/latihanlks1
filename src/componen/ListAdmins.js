import React,{ useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

function ListAdmins(){
    const [admins,setAdmin] = useState([]);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token')

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/v1/admins",{
            method:"GET",
            headers:{
                "Content-Type" : "Application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data=>{
            console.log("Data : ",data);
            setAdmin(data.content);
        })
        .catch(error=>console.error("eror",error));
    },[]);
    return(
    
        <>
        <Header/>
        <div className="d-flex mt-5">
        <SideBar/>
        <div className="container flex-grow-1 mt-3">
        <div className="row justify-content-center">
                <h1 className="text-center">List Admin</h1>
                    <div className="col-11">
                        <table className="table table-striped table-hover table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Username</th>
                                    <th>Last Login</th>
                                    <th>Created at</th>
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {admins.length > 0 ? (
                                    admins.map((admin,index)=>(
                                        <tr key={admin.id || index}>
                                            <td>{index + 1}</td>
                                            <td>{admin.username}</td>
                                            <td>{admin.last_login_at??"-"}</td>
                                            <td>{admin.created_at}</td>
                                        </tr>
                                    ))
                                ):(
                                    <tr>
                                        <td colSpan="6" className="text-center">Loading Data...</td>
                                    </tr>
                                )}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
            
        
        </>
    )
}
export default ListAdmins;