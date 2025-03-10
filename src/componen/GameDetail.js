import { useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";

function GameDetail(){
    const [game,SetGame] = useState(null);
    const token = sessionStorage.getItem('token');

    const {slug} = useParams();
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/v1/games/:${slug}`,{
            method:'GET',
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response=>response.json())
        .then(data=>{
            SetGame(data);
            console.log("Game data : ",data);
        })
        .catch((error) => console.error("Fetch error:", error));
    },[slug,token]);
    return(
        <>
            <Header/>
            <div className="d-flex mt-5">
                <SideBar/>
                <div className="container mt-3">
                    <h1 className="text">Detail Game</h1>
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <table className="table table-bordered ">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Thumbnail</th>
                                        <th>UploadTimestamp</th>
                                        <th>Author</th>
                                        <th>scoreCount</th>
                                        <th>game_path</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {game ?(
                                        <tr>
                                            <td>{game.title}</td>
                                            <td>{game.description}</td>
                                            <td><img src={game.thumbnail} alt={game.title} width="100" /></td>
                                            <td>{game.UploadTimestamp}</td>
                                            <td>{game.author}</td>
                                            <td>{game.scoreCount}</td>
                                            <td><a href={game.game_path} target="_blank">Play</a></td>
                                        </tr>
                                    ):(
                                        <tr>
                                            <td colSpan="6">Loading . . .</td>
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
export default GameDetail;