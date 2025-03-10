import React,{ useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useNavigate, useParams } from "react-router-dom";

function UserProfile(){
    
    const [games,setGames] = useState([]);
    const [scores,setScores] = useState([]);
    const [score,setScore] = useState("");
    const token = sessionStorage.getItem('token');
    const {username} = useParams();
    const navigate = useNavigate();
    const [selectedSlug, setselectedSlug] = useState("");

    //get data user detail
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/v1/users/:${username}`,{
            method:'GET',
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response=>response.json())
        .then(data=>{
            setGames(data.authoredgame ||[]);
            setScores(data.highscores||[]);
            console.log(data);
            // setGames(data.highscores ||[]);
        })
        .catch((Error)=>console.error("eror",Error))
    },[username,token]);

    //function submit score
    const Score=async(e)=>{
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/api/v1/games/:${selectedSlug}/scores`,{
            method:'POST',
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({score})
        })
        .then(data=>data.json())
        .then(response=>{
            console.log(response);
            if (response.status === 'success') {
                console.log('berhasil');
                setScore("");
                // Tutup modal setelah submit
                document.querySelector("#score .btn-close").click();
            }else{
                alert('eror')
            }
        });
    }

    const Detail=(slug)=>{
        navigate(`/games-detail/${slug}`);
    }

    return (
        <>
            <Header/>
            <div className="d-flex mt-5">
                <SideBar/>
                <div className="container mt-3">
                    <h1 className="text">{username}</h1>
                    <div className="row justify-content-center">
                        <div className="col-11">
                            {/* jika tidak ada game authored game nya hilang  */}
                            {games.length > 0 && (
                                <>
                                    <h4 className="text">Authored Games</h4>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Thumbnail</th>
                                                <th>Submit Score</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {games
                                            .sort((a, b) => new Date(b.registeredTimestamp) - new Date(a.registeredTimestamp))
                                            .map((game, index) => (
                                                <tr key={game.id || index}>
                                                    <td>{index + 1}</td>
                                                    <td>{game.title}</td>
                                                    <td>{game.description}</td>
                                                    <td>
                                                        {game.thumbnail ? (
                                                            <img src={game.thumbnail} alt={game.title} width="100" />
                                                        ) : (
                                                            "No Image"
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#score" onClick={() => setselectedSlug(game.slug)}>
                                                            Submit Score
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}

                            <h4 className="text">High Scores</h4>
                            <table className="table table-bordered table-hover">
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
                                    {scores.length > 0 ? (
                                        scores.map((score,index)=>(
                                            <tr key={score.id ||index}>
                                                <td style={{ cursor:'pointer' }}
                                                onClick={()=>Detail(score.game.slug)}>{index + 1}</td>
                                                <td>{score.game.title}</td>
                                                <td>{score.score}</td>
                                                <td>{score.timestamp}</td>
                                                <td></td>
                                            </tr>
                                        ))
                                    ):(
                                        <tr>
                                            <td colSpan="6">Loading . . .</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="modal fade" id="score">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Add Score</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                        </div>
                                        <form className="form" onSubmit={Score}>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label htmlFor="scores" className="col-form-label">Score</label>
                                                    <input type="number" value={score} onChange={(e)=>setScore(e.target.value)} className="form-control" id="scores"></input>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button className="btn btn-primary" type="submit">Add</button>
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
export default UserProfile;