import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './SongStyles.css';
import AudioFile from '../home_components/audio.mp3';
import AudioPlayerHome from '../Player_components/AudioPlayerHome';

function SongObject({
    id,
    song_title,
    song_description,
    song_artwork,
    upload_file,
    artist_id,
    genre_id
}){


    return(
      <div>
            <div className="song-item" >
                {song_artwork && <img src={song_artwork} alt={song_title} className="song-artwork" />}
                <Link to={`/songs/${id}`}>
                <h3 className="song-title">title: {song_title}</h3>
                </Link>
                {upload_file ? <AudioPlayerHome audioFile={upload_file} /> : "Loading..."}
                {upload_file && <p className="song-link"><a href={upload_file} target="_blank" rel="noopener noreferrer">Download/View File</a></p>}
                <p className="song-description">description: {song_description}</p>
            </div>
        </div>
    )
}


export default SongObject;