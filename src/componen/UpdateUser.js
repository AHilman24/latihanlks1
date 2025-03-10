import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
function UpdateUser() {
    const { id } = useParams();
    const [user, setUser] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/users', {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        })
        .then((response) => {
            setUser({ 
                username: response.data.content.username ?? "", 
                password: "" 
            });
        })
        .catch((error) => console.error("Error fetching user:", error));
    }, [id, token]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const update = async (e) => {
        e.preventDefault();

        axios.put(`http://127.0.0.1:8000/api/v1/users/${id}`, user, {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        })
        .then(() => {
            alert("User updated successfully!");
            navigate("/list-users");
        })
        .catch((error) => alert("Error updating user!"));
    };

    return (
        <>
            <Header />
            <div className="d-flex mt-5">
                <SideBar />
                <div className="container mt-3">
                    <h1 className="text">Update User</h1>
                    <div className="row justify-content-center">
                        <form className="form" onSubmit={update}>
                            <div className="form-group">
                                <div className="text">Username</div>
                                <div className="col-11">
                                    <input type="text" name="username" value={user.username} onChange={handleChange} className="form-control w-100" />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <div className="text">Password</div>
                                <div className="col-11">
                                    <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control w-100" />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <button className="btn btn-primary w-100">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateUser;
