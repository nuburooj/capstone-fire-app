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
        fire_count: 0,
        

    });
    
    const [initialState,setInitialState] = useState([])

    console.log(genreSong)
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5555/genres/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("SONGS DATA")
                console.log(data.songs)
                setGenreSong(prevState => ({
                    ...prevState, 
                    ...data,
                
                }));
                setInitialState(data.songs)
            });
    }, [id]);

   
    const Individualsong = ({song})=>{
       let newfirecount = song.fire_count
        const [individualFireCount, setIndividualFireCount] = useState(song.fire_count)
        const [fetchFireCount, setFireCount] = useState(song.fire_count)
    useEffect(()=>{
        newfirecount = individualFireCount
        },[individualFireCount])
         const increment_fire_count = (songId,oldfire_count)=>{
            newfirecount = newfirecount+1
            alert(newfirecount)
             fetch(`http://localhost:5555/songs/${songId}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fire_count:newfirecount
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("DATA")
                console.log(data)
               
                     setIndividualFireCount(
                (prev)=>{
                    return prev+1
                }
            )     
            
            
            })
            .catch(error => {
                console.error('Error updating song:', error);
            });
  

    }


        return(
               <div className="song-item" key = {song.id}>
                                <Link to={`/songs/${song.id}`}>
                                    <h3 className="song-title">{song.song_title}</h3>
                                </Link>
                                    <p className="song-description">{song.song_description}</p>
                                    <button onClick={(e)=>{
                                        e.preventDefault();
                                        increment_fire_count(song.id,song.fire_count);
                                        setFireCount((prev)=>{
                                            return prev+1
                                        })
                                    }}> 🔥{individualFireCount}</button>
                                    {song.song_artwork && <img src={song.song_artwork} alt={song.song_title} className="song-artwork" />}
                                    <AudioPlayerGenre genreSong={song.upload_file} />
                                    {song.upload_file && <p className="song-link"><a href={song.upload_file} target="_blank" rel="noopener noreferrer">Download/View File</a></p>}
                                    <p>Posted: {song.created_at}</p>
                            </div>
        )
    }

    return (
        <div>
            <NavBar />
            <div className="current-genre-heading-container">
            <div className="current-genre-heading">
            <h1 className="genre-name">{genreSong.genre_name}</h1>
            <h2 className="genre-description">{genreSong.genre_description}</h2>
          <button onClick={() => {
            setGenreSong((prev) => {
       
            let oldSongs = [...initialState];

        let filteredSongs = oldSongs.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB - dateA; 
        });

       
        let newData = {
            ...prev,
            songs: filteredSongs
        };

            return newData;
            });
        }}>Recent</button>

          <button onClick={() => {
                setGenreSong((prev) => {
                let old = [...initialState];
                let filteredSongs = old.sort((a, b) => {
            if (a.fire_count > b.fire_count) {
                return -1;
            }
            if (a.fire_count < b.fire_count) {
                return 1;
            }
                return 0;
        });
                let newdata={
                    ...prev,
                    songs:filteredSongs
                }
                return newdata

    });

}}>
            Hottest
            </button>
        </div>
        </div>
            <div className="current-genre-container">
                    <div>
                        {genreSong.songs.map(song => (
                            <Individualsong song={song}/>
                        ))}
                    </div>
                </div>
        </div>
    )


}

export default CurrentGenre;