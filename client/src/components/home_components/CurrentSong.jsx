import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AudioPlayer from '../Player_components/AudioPlayer';
import NavBar from '../NavBar';
import CommentList from '../comment_components/CommentList'
import { useUser } from '../user_components/UserContext';;


function CurrentSong({
    song_title,
    song_description,
    song_artwork,
    upload_file,
    genre_id,
    user
}) {
    const navigate = useNavigate()
    const {currentUser, setCurrentUser} = useUser()
    const [currentSong, setCurrentSong] = useState({
        song_title: '',
        song_description: '',
        song_artwork: '',
        upload_file: '',
        artist_id: '',
        user: {}
    });
    console.log(currentSong)
    const { id } = useParams();
console.log(id)

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

    function handleEditSong(){
        setEditMode(true);
    }

    function handleChange(e){
        const {name, value} = e.target
        setEditData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSave() {
    const updatedSong = {
        ...editData,

    };

    fetch(`http://localhost:5555/songs/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSong),
    })
    .then(response => response.json())
    .then(data => {
        setCurrentSong(data); 
        setEditMode(false);
    })
    .catch(error => console.error('Error updating song:', error));
}

    function handleCancel(){
        setEditMode(false);
    }

    function handleDeleteSong() {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
        fetch(`http://localhost:5555/songs/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            
            console.log('Song deleted successfully');
            navigate('/')
          
        })
        .catch(error => console.error('Error deleting song:', error));
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
                    { currentUser.id == currentSong.artist_id &&(
                <div>
                    {!editMode && <button onClick={handleEditSong}>Edit</button>}
                    <button onClick = {handleDeleteSong}>Delete</button>
                    </div>
                )}
                    <div>
                    <CommentList songUser={currentSong.user} songId={id}  />
                    </div>
                </div>
            </div>
        </div>
    )


}

export default CurrentSong;