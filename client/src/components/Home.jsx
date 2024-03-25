import React, { useState, useEffect } from 'react';
import { useUser } from './user_components/UserContext';
import NavBar from './NavBar';
import SongContainer from './home_components/SongContainer';
import AudioPlayer from './Player_components/AudioPlayer';
import AudioFile from './home_components/audio.mp3';

function Home() {

    const [songs, setSongs] = useState([])
    const {currentUser, setCurrentUser} = useUser();

    const user_name = currentUser.username




    useEffect(() => {
        fetch(`http://localhost:5555/songs`).then(res => {
            if (res.status != 200){
                console.log("ERROR FETCHING");
                return;
            }
            res.json().then(data => {
                if (data != null){
                    setSongs(data)
                    console.log(data);
                }
            });
        })
    }, [setSongs]);

    function handleSaveSong(id, updatedSong){
        fetch(`http://localhost:5555/songs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedSong),
        })
     .then(res => res.json())
     .then(data => {

        setSongs(prevSongs => prevSongs.map(song => 
            song.id === data.id ? data : song
        ));
    })
    }

    function handleDeleteSong(id) {
        fetch(`http://localhost:5555/songs/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
                setSongs(prevSongs => 
                    prevSongs.filter(song => song.id !== id)
                );
        })
    }

    return(
        <div>
            <NavBar />
            <h1>Home</h1>
            <p>{user_name} is Fired Up!</p>
            <SongContainer songs={songs} onSave={handleSaveSong} onDelete={handleDeleteSong}/>
        </div>
    )
}

export default Home;