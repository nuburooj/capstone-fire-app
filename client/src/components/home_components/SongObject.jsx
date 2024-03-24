import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './SongStyles.css';
import AudioFile from '../home_components/audio.mp3';
import AudioPlayerHome from '../Player_components/AudioPlayerHome';
import CreateComment from '../comment_components/CreateComment';

function SongObject({
    id,
    song_title,
    song_description,
    song_artwork,
    upload_file,
    artist_id,
    genre_id
}){

    const [currentSong, setCurrentSong] = useState({
        song_title: '',
        song_description: '',
        song_artwork: '',
        upload_file: ''
    });
    console.log(currentSong)
   


    function handleNewComment(newComment) {
        console.log(newComment); 
        if (newComment && newComment.id) {
            setCurrentSong(prevSong => ({
                ...prevSong,
                comments: [...prevSong.comments, newComment]
            }));
        } else {
            console.error('Attempted to add an undefined or invalid Comment:', newComment);
        }
    };


    useEffect(() => {
        fetch(`http://localhost:5555/songs/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.comments)
                setCurrentSong(prevState => ({
                    ...prevState, 
                    ...data 
                }));
            });
    }, [id]);

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
                <div>
                    <div>
                        {currentSong.comments && currentSong.comments.map(comment => (
                            <div key={comment.id}>
                                <p>{comment.comment_description}</p>
                            </div>
                        ))}
                    </div>
                    <CreateComment onAddComment={handleNewComment} songId={id} />
                </div>
            </div>
        </div>
    )
}


export default SongObject;