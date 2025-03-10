import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";

function SideBar(){
    const navigate = useNavigate();

    //function ke profile user
    const Profile=()=>{
        const user = sessionStorage.getItem('username');
        navigate(`/profile/${user}`)
    }
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width:'20%' }}>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="/dashboard" className="nav-link">Home</a>
                    </li>
                        {
                            (()=>{
                                if (sessionStorage.getItem('role') === 'admin') {
                                    return(
                                        <>
                                            <li className="nav-item">
                                                <a href="/list-admins" className="nav-link">List Admins</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="/list-users" className="nav-link">List Users</a>
                                            </li>
                                        </>
                                    )
                                }else{
                                    return(
                                        <>
                                            <li className="nav-item">
                                                <a href="/discover-games" className="nav-link">Discover Games</a>
                                            </li>
                                            <li className="nav-item">
                                                <button className="nav-link" onClick={Profile}>Profile</button>
                                            </li>
                                        </>
                                    )
                                }
                            })()
                        }
                </ul>
            </div>
        </>
    )
}
export default SideBar;