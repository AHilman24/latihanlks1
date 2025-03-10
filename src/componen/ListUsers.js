import React,{ useState,useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";

function ListUsers(){
    const [users,setUsers] = useState([]);
    const [user,setUser] = useState({username:"",password:""});
    const navigate = useNavigate();
    //ambil id user
    const [selectUserId,setSelectUserId] = useState("");
    const token = sessionStorage.getItem('token');

    //get data semua user
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/v1/users",{
            method:'GET',
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response=>response.json())
        .then(data=>{
            console.log("Data : ",data);
            setUsers(data.content||[])
        })
        .catch(Error=>console.error('eror',Error))
    },[token]);

    //function untuk update(di bagian input)
    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    //function ke modal dengan membawa id
    const toModal=(idUser)=>{
        const selectUser = users.find(s=>s.id === idUser);
        if (selectUser) {
            setSelectUserId(idUser);
            setUser({username:selectUser.username,password:selectUser.password})
        }
    }

    //function bagian update usernya
    const updateUser = async(e)=>{
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/v1/users/:${selectUserId}`,user,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(()=>{
        
            navigate('/list-users');
            //auto refresh
            setUsers(users.map(u => (u.id === selectUserId?{...u,...user}:u)));
            document.querySelector("#user .btn-close").click();
        })
        .catch((Error) => console.error("Eror",Error));
    }

    //function delete user sesuai id
    const handleDelete = async(userId)=>{
        if (!userId) {
            console.error("User ID is undefined!");
            return;
        }
        fetch(`http://127.0.0.1:8000/api/v1/users/:${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
        
        .then(response=>{
            console.log(response);
            if (response.status === 204) {
                //di filter jadi otomatis ke refresh
                setUsers(users.filter((user) => user.id !== userId));
            }else{
                alert('eror')
            }
        })
    }

    //function block user sesuai id
    const blockUser = async(userId)=>{
        if(!userId){
            console.log("user not found")
        }
        fetch(`http://127.0.0.1:8000/api/v1/users/:${userId}/block`,{
            method:'PATCH',
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response=>{
            console.log(response);
            console.log(userId);
            if(response.ok){
                alert("Block user success");
                //auto refresh
                setUsers(users.map(user => 
                user.id === userId ? { ...user, delete_reason: 'block' } : user
        ));
            }else{
                alert('eror')
            }
        })
    }

    //unblock user sesuai id
    const unblockUser = async(userId)=>{
        if(!userId){
            console.log("user not found")
        }
        fetch(`http://127.0.0.1:8000/api/v1/users/:${userId}/unblock`,{
            method:'PATCH',
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response=>{
            console.log(response);
            console.log(userId);
            if(response.ok){
                alert("UnBlocked user Success");
                //auto refresh
                setUsers(users.map(user => 
                user.id === userId ? { ...user, delete_reason:'unblock' } : user
        ));
            }else{
                alert('eror')
            }
        })
    }

    //function ke halaman profile
    const userProfile=(username)=>{
        navigate(`/profile/${username}`)
    }

    return (
        <>
            <Header/>
            <div className="d-flex mt-5">
                <SideBar/>
                <div className="container flex-grow-1 mt-3">
                    <div className="row justify-content-center">
                        <h1 className="text-center">List Users</h1>
                        <div className="col-11">
                            <div className="btn btn-success mb-2"><a href="/create-user" className="text-white " style={{ textDecoration:'none' }}>Add User</a></div>
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Username</th>
                                        <th>Registered At</th>
                                        <th>Last Login</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ?(
                                        users.map((user,index)=>(
                                            <tr key={user.id || index}>
                                                <td
                                                onClick={()=>userProfile(user.username)}
                                                style={{ cursor:'pointer' }}
                                                >{index + 1}</td>
                                                <td>{user.username}</td>
                                                <td>{user.created_at}</td>
                                                <td>{user.last_login_at ?? ""}</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" type="button">
                                                            Action
                                                        </button>
                                                        <div className="dropdown-menu">

                                                            <button className="btn btn-danger me-1 dropdown-item" onClick={()=>{console.log("User ID:", user.id);
                                                                handleDelete(user.id)}}>Delete</button>
                                                            <button className="btn btn-warning me-1 dropdown-item" 
                                                            onClick={()=>toModal(user.id)}
                                                            data-bs-toggle="modal" data-bs-target="#user"
                                                            >Update</button>
                                                            {
                                                                (()=>{
                                                                    if (user.delete_reason === 'unblock') {
                                                                        return(
                                                                            <>
                                                                                <button className="btn btn-outline-danger dropdown-item" onClick={()=>blockUser(user.id,user.delete_reason === 'block')}>Block</button>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else if(user.delete_reason === 'block'){
                                                                        return(
                                                                            <>
                                                                                <button className="btn btn-outline-danger dropdown-item" onClick={()=>unblockUser(user.id,user.delete_reason === 'unblock')}>UnBlock</button>

                                                                            </>
                                                                        )
                                                                    }
                                                                })()
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ):(
                                        <tr>
                                            <td colSpan="6">Loading Data...</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="modal fade" id="user" aria-hidden="false">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Update User</h5>
                                            <button className="btn-close" type="button" data-bs-dismiss="modal"></button>
                                        </div>
                                        <form className="form" onSubmit={updateUser}>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label htmlFor="#username" className="col-form-label">Username</label>
                                                    <input type="text" id="username" name="username" value={user.username} onChange={handleChange} className="form-control"></input>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="#password" className="col-form-label">Password</label>
                                                    <input type="password" id="password" name="password" onChange={handleChange} className="form-control"></input>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button className="btn btn-primary" type="submit">Update</button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListUsers;