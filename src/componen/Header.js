import React,{ useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header(){

    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');
    
    //(middleware lah)
    useEffect(()=>{
        if (!sessionStorage.getItem('token')) {
            navigate('/');
        }
    },[navigate]);

    //function logout
    const logout = async(e)=>{
        e.preventDefault();
        if (!token) {
            console.log('token not found')
            return;
        }
        fetch("http://127.0.0.1:8000/api/v1/auth/signout",{
            method:'POST',
            headers:{
                "Content-Type":"Application/json",
                'Accept':"application/json",
                'Authorization':`Bearer ${token}`
            },
        })
        // .then(data=>data.json())
        .then(response=>{
            console.log(response)
            console.log(username)
            if (response.status === 204) {
                navigate('/');
                console.log('success')
                sessionStorage.clear()
            }else{
                console.log('failed')
            }
        })
    }
  
    return(
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
                <div className="container">      
                    <a className="navbar-brand" href="/dashboard">Game Dashboard</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            {
                                (()=>{
                                    if (sessionStorage.getItem('token') !== null ) {
                                        return(
                                            <>
                                                <li className="nav-item me-1">
                                                    <a className="btn btn-outline-dark" href="/" onClick={logout}>Log Out</a>
                                                </li>  
                                            </>
                                        ) 
                                    }
                                })()
                            }
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header;