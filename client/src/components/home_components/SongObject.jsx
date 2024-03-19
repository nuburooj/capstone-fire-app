import React from 'react';
import './SongStyles.css';

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
                <h3 className="song-title">title: {song_title}</h3>
                <p className="song-description">description: {song_description}</p>
                {song_artwork && <img src={song_artwork} alt={song_title} className="song-artwork" />}
                {upload_file && <p className="song-link"><a href={upload_file} target="_blank" rel="noopener noreferrer">Download/View File</a></p>}
            </div>
        </div>
    )
}


export default SongObject;