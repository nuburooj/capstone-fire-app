import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from '../Player_components/AudioPlayer';
import NavBar from '../NavBar';
import CreateComment from '../comment_components/CreateComment';


function CurrentSong({
    song_title,
    song_description,
    song_artwork,
    upload_file,
    genre_id,
}) {
    const[addComment, setAddComment] = useState([])
    const [currentSong, setCurrentSong] = useState({
        song_title: '',
        song_description: '',
        song_artwork: '',
        upload_file: ''
    });
    console.log(currentSong)
    const { id } = useParams();


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

    return (
         <div>
            <div>
                <NavBar />
                <div className="song-item" >
                    {currentSong.song_artwork && <img src={currentSong.song_artwork} alt={currentSong.song_title} className="song-artwork" />}
                    <h3 className="song-title">title: {currentSong.song_title}</h3>
                    <AudioPlayer currentSong={currentSong.upload_file} />
                    {currentSong.upload_file && <p className="song-link"><a href={currentSong.upload_file} target="_blank" rel="noopener noreferrer">Download/View File</a></p>}
                    <p className="song-description">description: {currentSong.song_description}</p>
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

export default CurrentSong;