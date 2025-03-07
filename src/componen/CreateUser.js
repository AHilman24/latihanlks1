import Header from "./Header";
import SideBar from "./SideBar";
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser(){

    const [username,setUsername] = useState([]);
    const [password,setPassword] = useState([]);

    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    const create=async(e)=>{
        e.preventDefault();

        fetch("http://127.0.0.1:8000/api/v1/users",{
            method:'POST',
            headers:{
                "Content-Type":"Application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({username,password})
        })
        .then(data=>data.json())
        .then(response=>{
            console.log(response);
            if (response.status === 'success') {
                alert('create user success');
                console.log('success');
                navigate('/list-users');
            }else if(response.status === 'failed') {
                alert('user already exists');
                console.log('failed');
                navigate('/create-user')   
            }else if(response.status === 'invalid'){
                alert('Invalid credentials');
                console.log('Invalid');
                navigate('/create-user')  
            }
        })
    }

    return(
        <>
            <Header/>
            <div className="d-flex mt-5">
                <SideBar/>
                <div className="container flex-grow-1 mt-3">
                    <div className="row justify-content-center">
                        <h1 className="text">Create User</h1>
                        <div className="col-11">
                            <form className="form" onSubmit={create}>
                                <div className="form-group">
                                    <div className="col-4">
                                        Username
                                    </div>
                                    <div className="col-7 w-100"><input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control w-100"></input></div>
                                </div>
                                <div className="form-group mt-3">
                                    <div className="col-4">
                                        Password
                                    </div>
                                    <div className="col-7 w-100"><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control w-100"></input></div>
                                </div>
                                <div className="form-group mt-3 "><button className="btn btn-primary w-100" type="submit">Create</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateUser;