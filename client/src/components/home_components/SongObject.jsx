import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './SongStyles.css';
import AudioPlayerHome from '../Player_components/AudioPlayerHome';
import CreateComment from '../comment_components/CreateComment';

function SongObject({
    id,
    song_title,
    song_description,
    song_artwork,
    upload_file,
    artist_id,
    genre_id,
    onSave,
    onDelete
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


    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({
        id: id,
        song_title: song_title,
        song_description: song_description,
    })

    function handleEdit(){
        setEditMode(true);
    }

    function handleChange(e){
        const {name, value} = e.target
        setEditData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSave(){
        onSave(id, editData);
        setEditMode(false);
    }

    function handleCancel(){
        setEditMode(false);
    }

    function handleDelete(){
        //set option for confirm deletion 
        const confirmDelete = window.confirm('Are you sure you want to delete?')

        if (confirmDelete){
            onDelete(id);
        }
    }

    if (editMode) {
        return (
            <div>
                <input
                name = "song_title"
                value = {editData.song_title}
                onChange = {handleChange}
                />
                <textarea
                name = "song_description"
                value = {editData.song_description}
                onChange = {handleChange}
                />
                <button onClick = {handleSave}>Save</button>
                <button onClick = {handleCancel}>Cancel</button>
            </div>
        )
    }
    

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
                <button onClick = {handleEdit}>Edit</button>
                <button onClick = {handleDelete}>Delete</button>
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