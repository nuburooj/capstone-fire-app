import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from '../Player_components/AudioPlayer';
import AudioFile from './audio.mp3';
import NavBar from '../NavBar';


function CurrentSong({
    song_title,
    song_description,
    song_artwork,
    upload_file,
    genre_id,
}) {

    const [currentSong, setCurrentSong] = useState({
        song_title: '',
        song_description: '',
        song_artwork: '',
        upload_file: ''
    });
    console.log(currentSong)
    const { id } = useParams();



    useEffect(() => {
        fetch(`http://localhost:5555/songs/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCurrentSong(prevState => ({
                    ...prevState, // Use prevState to ensure you're correctly updating the state based on its previous value
                    ...data // This updates the state with fetched data, assuming data structure matches your state
                }));
            });
    }, [id]);

    return (
         <div>
            <div>
                <NavBar />
                <div className="song-item" >
                    {currentSong.song_artwork && <img src={currentSong.song_artwork} alt={currentSong.song_title} className="song-artwork" />}
                    <h3 className="song-title">title: {currentSong.song_title}</h3>
                    <AudioPlayer audioFile={AudioFile} />
                    {currentSong.upload_file && <p className="song-link"><a href={currentSong.upload_file} target="_blank" rel="noopener noreferrer">Download/View File</a></p>}
                    <p className="song-description">description: {currentSong.song_description}</p>
                </div>
            </div>
        </div>
    )


}

export default CurrentSong;