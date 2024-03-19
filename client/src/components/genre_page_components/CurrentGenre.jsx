import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CurrentGenre({
    genre_name,
    genre_description,
    songs,
}) {
    const [genreSong, setGenreSong] = useState({
        genre_name: '',
        genre_description: '',
        songs: [],
    });
    console.log(genreSong)
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5555/genres/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.songs)
                setGenreSong(prevState => ({
                    ...prevState, 
                    ...data 
                }));
            });
    }, [id]);

    return (
        <div>
        <h1>{genreSong.genre_name}</h1>
        <h2>{genreSong.genre_description}</h2>
        <div>
          {genreSong.songs && genreSong.songs.map(song => (
              <div>
                    <h3 key={song.id}>{song.song_title}</h3>
                    <p>{song.song_description}</p>
                    <p>{song.song_artwork}</p>
                    <p>{song.upload_file}</p>
              </div>
          ))}
        </div>
    </div>
    )


}

export default CurrentGenre;