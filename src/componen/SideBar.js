import Header from "./Header";

function SideBar(){
    return (
        <>
            {/* <Header/> */}
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width:'20%' }}>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="#" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/list-admins" className="nav-link">List Admins</a>
                    </li>
                    <li className="nav-item">
                        <a href="/list-users" className="nav-link">List Users</a>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default SideBar;