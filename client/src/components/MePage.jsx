import React, { useState, useEffect } from "react";

import NavBar from "./NavBar";
import { useUser } from "./user_components/UserContext";
import SongObject from "./home_components/SongObject";
import SongContainer from "./home_components/SongContainer";
import { Link } from "react-router-dom";
import AudioPlayerHome from "./Player_components/AudioPlayerHome";
import CommentList from "./comment_components/CommentList";

function MePage() {
    const {currentUser} = useUser();
    const [userSongs, setUserSongs] = useState([]) 
    
    console.log(currentUser)
    
    


useEffect(() => {
        fetch(`/songs`).then(res => {
            if (res.status != 200){
                console.log("ERROR FETCHING");
                return;
            }
            res.json().then(data => {
                if (data != null){
            // console.log("BEING STORED")
            // console.log(data)
                 setUserSongs(data)
    
            }});
        })
    }, [setUserSongs]);

     const increment_fire_count=(updated,id,setFireCount) => {
                // console.log("FIRED")
                // console.log(currentSong.fire_count)
                
 
            fetch(`http://localhost:5555/songs/${id}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
        },
                body: JSON.stringify({
                fire_count: updated+1
        })
    })
                .then(response => response.json())
                .then(data => {
              
              setFireCount((prev)=>{
                return prev+1
              })
                    console.log('Updated song data:', data);

        })
                .catch(error => {
                console.error('Error updating song:', error);
        });

        }


const Rendersongs=({song})=>{
    const [currentFireCount,setFireCount] = useState(song.fire_count)
    let new_fire_count = song.fire_count
    return(
      <>
      
            <div>
            <div className="song-item" >
                {currentUser.user_picture && <img src={currentUser.user_picture} alt={currentUser.username} className="user-picture" />}
                <h2>{currentUser.username}</h2>
                <p>Posted: {song.created_at}</p>
                {song.song_artwork && <img src={song.song_artwork} alt={song.song_title} className="song-artwork" />}
                <Link to={`/songs/${song.id}`}>
                <h3 className="song-title">title: {song.song_title}</h3>
                </Link>
                {song.upload_file ? <AudioPlayerHome audioFile={song.upload_file} /> : "Loading..."}
                {song.upload_file && <p className="song-link"><a href={song.upload_file} target="_blank" rel="noopener noreferrer">Download/View File</a></p>}
                <p className="song-description">description: {song.song_description}</p>
                <button onClick={()=>increment_fire_count(currentFireCount,song.id,setFireCount)}> 🔥{currentFireCount}</button>
                { currentUser.id == song.artist_id &&(
                <div>
             
                </div>
                )}
                <div>
                    <CommentList songUser={currentUser} songId={song.id}  />
                </div>
               
              
            </div>
        </div>
    
       
      </>
    )
}


    return (
        <div>
            <NavBar />
            <div>
                <h1>ME</h1>
                {currentUser ? ( 
                    <div>
                        <h2>Details</h2>
                        <img src={currentUser?.user_picture} alt={currentUser?.username} className="user-picture" />
                        <p>Username: {currentUser?.username}</p>
                        <p>Email: {currentUser?.email}</p>
                        <p>Spotify: {currentUser?.Socials}</p>
                        <div>
                            {userSongs?.map((song,i)=>{
       
        return (
       
      <Rendersongs song={song}/>
        )
      })}
                        </div>
                    </div>
                ) : (
                    <p>Loading user details...</p> 
                )}
            </div>
        </div>
    );
}

export default MePage;