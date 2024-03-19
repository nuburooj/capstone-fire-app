import React from 'react';
import './SongStyles.css';
import AudioPlayer from '../Player_components/AudioPlayer';
import AudioFile from '../home_components/audio.mp3';

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
                <h3 className="song-title">title: {song_title}</h3>
                <AudioPlayer audioFile={AudioFile} />
                {upload_file && <p className="song-link"><a href={upload_file} target="_blank" rel="noopener noreferrer">Download/View File</a></p>}
                <p className="song-description">description: {song_description}</p>
            </div>
        </div>
    )
}


export default SongObject;