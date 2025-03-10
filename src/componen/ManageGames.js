import Header from "./Header";
import SideBar from "./SideBar";

function ManageGames(){
    return(
        <>
            <Header/>
            <div className="d-flex mt-5">
                <SideBar/>
                <div className="container mt-3 flex-grow-1">
                    <h1 className="text">Manage Games</h1>
                    <div className="row justify-content-center">
                        <div className="col-11">
                        <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Score Count</th>
                                        <th>Thumbnail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {games.length > 0 ?(
                                        games.map((game,index)=>(
                                            <tr key={game.id || index}>
                                                <td>{index + 1}</td>
                                                <td>{game.title}</td>
                                                <td>{game.description}</td>
                                                <td>{game.scoreCount}</td>
                                                <td>{game.thumbnail ?? "-"}</td>
                                            </tr>
                                        ))
                                    ):(
                                        <tr>
                                            <td colSpan="6">Loading . . .</td>
                                        </tr>
                                    )} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ManageGames;