import React,{ useState,useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useNavigate,useLocation } from "react-router-dom";

function ListUsers(){
    const [users,setUsers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    // let user_id = location.state.id;

    const token = sessionStorage.getItem('token');

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
    },[]);

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
                setUsers(users.filter((user) => user.id !== userId));
                // alert('delete user success');
                // navigate('/list-users');
            }else{
                alert('eror')
            }
        })
    }

    const blockUser = async(userId,isBlocked)=>{
        if(!userId){
            console.log("user not found")
        }

        const action = isBlocked?"unblock":"block";

        fetch(`http://127.0.0.1:8000/api/v1/users/:${userId}/${action}`,{
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
                alert(`${isBlocked ? "Unblocked" : "Blocked"} successfully!`);
                setUsers(users.map(user => 
                user.id === userId ? { ...user, delete_reason: isBlocked ? 'unblock' : 'block' } : user
        ));
            }else{
                alert('eror')
            }
        })
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
                                                <td>{index + 1}</td>
                                                <td>{user.username}</td>
                                                <td>{user.created_at}</td>
                                                <td>{user.last_login_at ?? ""}</td>
                                                <td>
                                                    <button className="btn btn-danger me-1" onClick={()=>{console.log("User ID:", user.id);
                                                        handleDelete(user.id)}}>Delete</button>
                                                    <button className="btn btn-warning me-1" onClick={()=>{navigate(`/update-user/:${user.id}`)}}>Update</button>
                                                    {
                                                        (()=>{
                                                            if (user.delete_reason === 'unblock') {
                                                                return(
                                                                    <>
                                                                        <button className="btn btn-outline-danger" onClick={()=>blockUser(user.id,user.delete_reason === 'unblock')}>unBlock</button>
                                                                    </>
                                                                )
                                                            }else{
                                                                return(
                                                                    <>
                                                                        <button className="btn btn-outline-danger" onClick={()=>blockUser(user.id,user.delete_reason === 'block')}>Block</button>

                                                                    </>
                                                                )
                                                            }
                                                        })()
                                                    }
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListUsers;