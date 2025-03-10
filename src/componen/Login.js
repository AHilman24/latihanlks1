import Header from "./Header";
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    //function login
    const auth = async(e)=>{
        e.preventDefault();

        fetch("http://127.0.0.1:8000/api/v1/auth/signin",{
            method:'POST',
            headers:{
                "Content-Type":"Application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify({username,password})
        })
        .then(data=>data.json())
        .then(response=>{
            console.log(response)
            if (response.status === 'success') {
                console.log('succes');
                sessionStorage.setItem('token',response.token);
                sessionStorage.setItem('username',username);
                sessionStorage.setItem('role',response.role);
                navigate('/dashboard');
            }else{
                alert('eror')
                console.log('failed');
            }
        })

    }

    return (
        <>
            <Header/>
            <div className="container p-3 mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="card card-default" onSubmit={auth}>
                            <div className="card-header">
                                <h4 className="text-center">Login</h4>
                            </div>
                            <div className="card-body">
                                <div className="form-group row">
                                    <div className="col-4 text">username</div>
                                    <div className="col-8">
                                        <input type="text"value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control "></input>
                                    </div>
                                </div>
                                <div className="form-group row mt-4">
                                    <div className="col-4 text">password</div>
                                    <div className="col-8">
                                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="text-center mt-2">
                                    <a href="/signup" className="text-muted" style={{ textDecoration:"none" }}>Sign Up?</a>
                                </div>
                                <div className="form-group mt-2 row">
                                    <div className="col-12"><button className="btn btn-primary w-100" type="submit">Login</button></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;