import React, { useState, useEffect } from "react";

import NavBar from "./NavBar";
import { useUser } from "./user_components/UserContext";
import SongObject from "./home_components/SongObject";
import SongContainer from "./home_components/SongContainer";

function MePage() {
    const {currentUser} = useUser();
    const [userSongs, setUserSongs] = useState([]) 
    
    console.log(currentUser.songs)
    
    


useEffect(() => {
        fetch(`/songs`).then(res => {
            if (res.status != 200){
                console.log("ERROR FETCHING");
                return;
            }
            res.json().then(data => {
                if (data != null){
                    setUserSongs(data.map((song) =>{
                        console.log("SONGS")
                console.log(song)
                console.log(song?.id)
                return(
                    <SongObject key={song?.id.toString()}
                     id={song?.id}
            song_title={song?.title}
            song_description={song?.song_description}
            song_artwork={song?.song_artwork}
            upload_file={song?.upload_file}
            />
            )
            
        }))
            }});
        })
    }, [setUserSongs]);

    return (
        <div>
            <NavBar />
            <div>
                <h1>ME</h1>
                {currentUser ? ( 
                    <div>
                        <h2>Details</h2>
                        <img src={currentUser.user_picture} alt={currentUser.username} className="user-picture" />
                        <p>Username: {currentUser.username}</p>
                        <p>Email: {currentUser.email}</p>
                        <p>Spotify: {currentUser.Socials}</p>
                        <div>
                            {userSongs}
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