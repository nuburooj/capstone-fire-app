import React, {useState, useEffect } from "react";
import NavBar from "../NavBar";
import { Link, useParams } from "react-router-dom";
import AudioPlayerHome from "../Player_components/AudioPlayerHome";
import CommentList from "../comment_components/CommentList";

function OtherUser(){
    const [songs, setSongs] = useState([]);
    const [otherUser, setOtherUser] = useState('');

    const { id } = useParams();
console.log(id)
    useEffect(() => {
        fetch(`http://localhost:5555/users/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setSongs(data.songs)
                setOtherUser(data)
            });
    }, [id]);


    const increment_fire_count=(updated,id,setFireCount) => {
                // console.log("FIRED")
                // console.log(currentSong.fire_count)
                
 
            fetch(`http://localhost:5555/songs/${id}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
        },
                body: JSON.stringify({
                fire_count: updated+1
        })
    })
                .then(response => response.json())
                .then(data => {
              
              setFireCount((prev)=>{
                return prev+1
              })
                    console.log('Updated song data:', data);

        })
                .catch(error => {
                console.error('Error updating song:', error);
        });

        }


    const Rendersongs=({song})=>{
    const [currentFireCount,setFireCount] = useState(song.fire_count)
    let new_fire_count = song.fire_count
    return(
      <>
      
            <div>
            <div className="song-item" >
                {otherUser.user_picture && <img src={otherUser.user_picture} alt={otherUser.username} className="user-picture" />}
                <h2>{otherUser.username}</h2>
                <p>Posted: {song.created_at}</p>
                {song.song_artwork && <img src={song.song_artwork} alt={song.song_title} className="song-artwork" />}
                <Link to={`/songs/${song.id}`}>
                <h3 className="song-title">title: {song.song_title}</h3>
                </Link>
                {song.upload_file ? <AudioPlayerHome audioFile={song.upload_file} /> : "Loading..."}
                {song.upload_file && <p className="song-link"><a href={song.upload_file} target="_blank" rel="noopener noreferrer">Download/View File</a></p>}
                <p className="song-description">description: {song.song_description}</p>
                <button onClick={()=>increment_fire_count(currentFireCount,song.id,setFireCount)}> 🔥{currentFireCount}</button>
                { otherUser.id == song.artist_id &&(
                <div>
             
                </div>
                )}
                <div>
                    <CommentList songUser={otherUser} songId={song.id}  />
                </div>
               
              
            </div>
        </div>
    
       
      </>
    )
}
    

    return(
        <div>
            <div>
                <NavBar />
            </div>
            <h1>Other User</h1>
            <div>
                        <img src={otherUser?.user_picture} alt={otherUser?.username} className="user-picture" />
                        <p>Username: {otherUser?.username}</p>
                        <p>Email: {otherUser?.email}</p>
                        <p>Spotify: {otherUser?.Socials}</p>
                        <div>
                            {songs?.map((song,i)=>{
       
                            return (
       
                        <Rendersongs song={song}/>
                                     )
                         })}
                        </div>
            </div>


        </div>
    )
}

export default OtherUser;