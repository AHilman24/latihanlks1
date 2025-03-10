import { useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailGame(){

    const [score,setScore] = useState([]);
    const [game,setgames] = useState(null);
    const {slug} = useParams();
    const token = sessionStorage.getItem('token');
    
    //get data score game 
    useEffect(()=>{
        const fetchScores = () =>{
            fetch(`http://127.0.0.1:8000/api/v1/games/:${slug}/scores`,{
                method:'GET',
                headers:{
                    'Content-Type':'Application/json',
                    'Authorization':`Bearer ${token}`
                }
            })
            .then(response=>response.json())
            .then(data=>{
                setScore(data.scores||[])
            })
            .catch((Error)=>console.error("Eror",Error));
        };

        //biar terkesan realtime
        fetchScores();

        const interval = setInterval(fetchScores,5000);

        return () => clearInterval(interval);
    },[slug,token]);

    //get data detail game
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/v1/games/:${slug}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(response=>{
            console.log("Response data:",response.data);
            setgames(response.data)
        })
        .catch((error) => console.error("Error fetching game:", error));
    },[slug,token]);

    return(
        <>
            <Header/>
            <div className="d-flex mt-5">
                <SideBar/>
                <div className="container mt-3">
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <h1 className="text">Detail Game</h1>
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
                            <h1 className="text">Leaderboard HighScores</h1>
                            <table className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Username</th>
                                        <th>Score</th>
                                        <th>Description Game</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {score.length > 0 ?(
                                        score.map((scores,index)=>(
                                            <tr key={scores.id ||index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {
                                                        (()=>{
                                                            if(sessionStorage.getItem('username') === scores.username && index < 10){
                                                                return(
                                                                    <>
                                                                        <strong>{scores.username}</strong>
                                                                    </>
                                                                )
                                                            }else{
                                                                return(
                                                                    <>
                                                                        {scores.username}
                                                                    </>
                                                                )
                                                            }
                                                        })()
                                                    }       
                                                </td>
                                                <td>{scores.score}</td>
                                                <td>{game?game.description:"Loading ..."}</td>
                                            </tr>
                                        ))
                                    ):(
                                        <tr>
                                            <td colSpan="6">Loading. . .</td>
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
export default DetailGame;