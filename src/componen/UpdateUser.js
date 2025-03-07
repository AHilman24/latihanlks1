import Header from "./Header";
import SideBar from "./SideBar";
import React,{ useEffect, useState } from "react";
import { useNavigate,useParams,useLocation } from "react-router-dom";

function UpdateUser(){
    const {id} = useParams();
    const [user,setUser] = useState({
        username:"",
        password:""
    });
    const navigate = useNavigate('');
    const token = sessionStorage.getItem('token');
    const location = useLocation();
    const id_user = location.state?.id ||"unknow";

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/v1/users',{
            method:'GET',
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response=>response.json())
        .then(data=>
            {
            console.log("data",data);
            const findUser = data.content?.find((u) => u.id === id);
            console.log("Find user",findUser);
            if (findUser) {
                setUser({
                    username:findUser.username || "",
                    password:""
                });
            }else{
                console.error('User not found');
            }
        }
    )
        .catch((Error)=>console.error("Eror",Error));
    },[id,token]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const update = async(e)=>{
        e.preventDefault();

        fetch(`http://127.0.0.1:8000/api/v1/users/:${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(user),
        })
        .then(data=>data.json())
        .then(response=>{
            if (response.status === "success") {   
                alert('Succes');
                navigate('/list-users')
            }else{
                alert('eror');
            }
        })
        .catch((Error)=>console.error("error",Error));
    }
    
    return(
        <>
            <Header/>
            <div className="d-flex mt-5">
                <SideBar/>
                <div className="container mt-3">
                    <h1 className="text">Update User</h1>
                    <div className="row justify-content-center">
                        <form className="form" onSubmit={update}>
                            <div className="form-group">
                                <div className="text">Username</div>
                                <div className="col-11"><input type="text" name="username" value={user.username} onChange={handleChange} className="form-control w-100"></input></div>
                            </div>
                            <div className="form-group mt-3">
                                <div className="text">Password</div>
                                <div className="col-11"><input type="password" name="password" value={user.password} onChange={handleChange} className="form-control w-100"></input></div>
                            </div>
                            <div className="form-group mt-3"><button className="btn btn-primary w-100">Update</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateUser;