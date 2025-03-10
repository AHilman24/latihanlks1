import Header from "./Header";
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();

    //function signup
    const signup= async(e)=>{
        e.preventDefault();

        fetch("http://127.0.0.1:8000/api/v1/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({username,password})
        })
        .then(data=>data.json())
        .then(response=>{
            console.log(response)
            if (response.status === 'success') {
                console.log('success')
                navigate('/')
                alert('success')
            }else{
                console.log('failed')
                navigate('/signup')
                alert('eror')
            }
        })
    }

    return(
        <>
            <Header/>
            <div className="container p-3 mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="card card-default" onSubmit={signup}>
                            <div className="card-header">
                                <h4 className="text-center">Sign Up</h4>
                            </div>
                            <div className="card-body">
                                <div className="form-group row">
                                    <div className="text col-4">Username</div>
                                    <div className="col-8"><input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control"></input></div>
                                </div>
                                <div className="form-group row mt-4">
                                    <div className="text col-4">Password</div>
                                    <div className="col-8"><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control"></input></div>
                                </div>
                                <div className="text-center mt-2">
                                    <a className="text-muted " style={{ textDecoration:"none" }} href="/">Sign In?</a>
                                </div>
                                <div className="form-group mt-2">
                                    <button className="btn btn-primary w-100" type="submit">Sign Up</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignUp;