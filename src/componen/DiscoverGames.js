import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import React,{ useEffect, useState } from "react";
import axios from "axios";

function DiscoverGames(){

    const [games,setgames] = useState([]);
    const [game,uptGame] = useState({title:"",description:""});
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [file,setFile] = useState("");
    const [selectedSlug, setselectedSlug] = useState("");
    const [sorted,setSorted] = useState("asc");
    const [setVersionGame] = useState("");

    //get data game
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/v1/games",{
            method:'GET',
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response=>response.json())
        .then(data=>{
            setgames(data.content||[])
        })
        .catch((Error)=>console.error("Eror",Error))
    },[]);

    //function ke halaman detail game
    const Detail=(slug)=>{
        navigate(`/games-detail/${slug}`);
    }

    //function untuk update game(di bagian input)
    const handleChange=(e)=>{
        uptGame({...game,[e.target.name]:e.target.value});
    };

    //function ke modal update game dengan slug
    const toModal=(slug)=>{
        const selectedGame = games.find(g => g.slug === slug)
        if (selectedGame) {
            setselectedSlug(slug);
            uptGame({title:selectedGame.title,description:selectedGame.description})
        }
    }

    // function bagian update gamenya 
    const update = async(e) =>{
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/v1/games/:${selectedSlug}`,game,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((response)=>{
            console.log(response.data);
            if (response.data.status === 'success') {
                navigate('/discover-games');
                //auto update form nya cuyy
                setgames(games.map(g => (g.slug === selectedSlug ? { ...g, ...game } : g)));
                //otom close
                document.querySelector("#update .btn-close").click();
            }
            // else{
            // console.log(error.response.data);
                // navigate(`/detail-game/${selectedSlug}`)
            // }
            
        })
        //middleware lah wkwk
        .catch((error) => {
            if(error.response.data.status === 'forbidden'){
                console.log(error.response.data);
                // alert('you are not author this game');
                const confirm = window.confirm('you are not author this game. let see detail this game?')
                if (!confirm) {
                    return;
                }else{
                    navigate(`/games-detail/${selectedSlug}`);
                }
            }
        })
    }

    //function upload file(update version game) sesuai slug
    const version = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("zipfile",file);
        fetch(`http://127.0.0.1:8000/api/v1/games/:${selectedSlug}/upload`,{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${token}`
            },
            body:formData
        })
        .then(data=>data.json())
        .then(response=>{
            console.log(response);
            if(response.status === 'success'){
                alert('success update version');
                navigate('/discover-games');
                document.querySelector('#version .btn-close').click();
            }else if(response.status === 'forbidden'){
                const confirm = window.confirm('you are not author this game. let see detail this game?')
                if (!confirm) {
                    return;
                }else{
                    navigate(`/games-detail/${selectedSlug}`);
                }
            }
        })
        .catch((error) => {
            console.log("Error",error)
        })
        
    }

    //function delete game sesuai slug
    const deleteGame=async(Slug)=>{
        const confirm = window.confirm('yakin di hapus?');
        if (!confirm) {
            return;
        }
        fetch(`http://127.0.0.1:8000/api/v1/games/:${Slug}`,{
            method:'DELETE',
            headers: {
                "Content-Type": "Application/json",
                'Authorization': `Bearer ${token}`,
            },

        })
        .then(response=>{
            console.log(response);
            if(response.status === 204){
                setgames(games.filter((gm)=>gm.slug !== Slug));
            }
            else if(response.status === 403){
                const confirm = window.confirm('you are not author this game. let see detail this game?')
                if (!confirm) {
                    return;
                }else{
                    navigate(`/games-detail/${Slug}`);
                }
            }
        })
        .catch((error) => {
            console.log("Error",error)
        })
    }

    //function sortir game berdasarkan title
    const sortGames=()=>{
        const sortedGames = [...games].sort((a,b)=>{
            return a.title.localeCompare(b.title, undefined, { numeric: true });
        });
        if (sorted === "desc") {
            sortedGames.reverse();
        }
        setgames(sortedGames);
        setSorted(sorted === "asc"?"desc":"asc");
    };

    return(
        <>
            <Header/>
            <div className="d-flex mt-5">
                <SideBar/>
                <div className="container flex-grow-1 mt-3">
                    <h1 className="text">Discover Game</h1>
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th style={{ cursor:'pointer' }} onClick={sortGames}>Title {sorted === "asc"?"⬆️":"⬇️"}</th>
                                        <th>Description</th>
                                        <th>Score Count</th>
                                        <th>Thumbnail</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {games.length > 0 ?(
                                        games.map((game,index)=>(
                                            <tr key={game.id || index}
                                            >
                                                <td onClick={()=>Detail(game.slug)}
                                                style={{ cursor:'pointer' }}>{index + 1}</td>
                                                <td>{game.title}</td>
                                                <td>{game.description}</td>
                                                <td>{game.scoreCount}</td>
                                                <td>{game.thumbnail ?? "-"}</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Action</button>
                                                        <ul className="dropdown-menu">
                                                            <li><button className="dropdown-item btn" data-bs-toggle="modal" data-bs-target="#update" onClick={()=>toModal(game.slug)}>Update</button></li>
                                                            <li><button className="dropdown-item btn" onClick={()=>deleteGame(game.slug)}>Delete</button></li>
                                                            <li><button className="dropdown-item btn" data-bs-toggle="modal" data-bs-target="#version" onClick={()=>toModal(game.slug)}>Update Version</button></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ):(
                                        <tr>
                                            <td colSpan="6">Loading . . .</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="modal fade" id="update" aria-hidden="false">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Update</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                        </div>
                                        <form onSubmit={update}>
                                            <div className="modal-body">
                                                <p><strong>Game Slug: </strong>{selectedSlug}</p>
                                                <div className="mb-3">
                                                    <label htmlFor="#title" className="col-form-label">Title</label>
                                                    <input type="text" id="title" name="title" value={game.title} onChange={handleChange} className="form-control"></input>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="#des" className="col-form-label">Description</label>
                                                    <textarea id="des" name="description" value={game?.description} onChange={handleChange} className="form-control"></textarea>
                                                </div> 
                                            </div>
                                            <div className="modal-footer">
                                                <button type="submit" className="btn btn-primary">Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="modal fade" id="version" aria-hidden="false">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Update Version</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                        </div>
                                        <form className="form" onSubmit={version}>
                                            <div className="modal-body">
                                                <p><strong>Game Slug: </strong>{selectedSlug}</p>
                                                <div className="mb-3">
                                                    <label htmlFor="#file" className="col-form-label">Upload File</label>
                                                    <input type="file" id="file" accept=".zip" onChange={(e)=>setFile(e.target.files[0])} className="form-control"></input>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="submit" className="btn btn-primary">Upload</button>
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
export default DiscoverGames;