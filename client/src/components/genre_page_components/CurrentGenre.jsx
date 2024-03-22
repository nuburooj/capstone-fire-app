import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './GenreStyles.css';
import NavBar from '../NavBar';
import AudioPlayerGenre from '../Player_components/AudioPlayerGenre';

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
            <NavBar />
                <div className="current-genre-heading-container">
        <div className="current-genre-heading">
            <h1 className="genre-name">{genreSong.genre_name}</h1>
            <h2 className="genre-description">{genreSong.genre_description}</h2>
        </div>
        </div>
            <div className="current-genre-container">
                    <div>
                        {genreSong.songs.map(song => (
                            <div className="song-item" key={song.id}>
                                <Link to={`/songs/${song.id}`}>
                                    <h3 className="song-title">{song.song_title}</h3>
                                </Link>
                                    <p className="song-description">{song.song_description}</p>
                                    {song.song_artwork && <img src={song.song_artwork} alt={song.song_title} className="song-artwork" />}
                                    <AudioPlayerGenre genreSong={song.upload_file} />
                                    {song.upload_file && <p className="song-link"><a href={song.upload_file} target="_blank" rel="noopener noreferrer">Download/View File</a></p>}
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    )


}

export default CurrentGenre;