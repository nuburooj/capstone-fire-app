import React from 'react';

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
        <h1>{song_title}</h1>
        <p>ID:{id}</p>
        <p>Artwork: {song_artwork}</p>
        <p>Description: {song_description}</p>
        <p>UF: {upload_file}</p>
        <p>Artist ID:{artist_id}</p>
        <p>Genre ID:{genre_id}</p>
       </div>
    )
}


export default SongObject;