import React , {useState,useEffect} from 'react';
import SongObject from './SongObject';

function SongContainer({songs, onSave, onDelete}){
console.log(songs)

const [newSongs,setNewSongs] = useState([])
useEffect(()=>{
setNewSongs(songs)
},[songs])

   
const songToRender = newSongs.map((songObj) => {
    return (
        <div key={songObj.id}>
            <SongObject {...songObj} onSave={onSave} onDelete={onDelete} />
        </div>
    );
});

    return(
        <div>
            <h1>Songs</h1>
            <button onClick={()=>{
                setNewSongs((prev)=>{
                    let oldsongs=[...songs]
                    let filteredsongs=oldsongs.sort((a,b)=>{
                    const dateA = new Date(a.created_at);
                    const dateB = new Date(b.created_at);

                    return dateB - dateA; 
                })
                    return filteredsongs
                })
            }}>Recent</button>
          <button onClick={() => {
                setNewSongs((prev) => {
            // Clone the previous state to avoid directly mutating it
                let old = [...prev];

            // Sort the cloned array in descending order of fire_count
                let filteredSongs = songs.sort((a, b) => {
            // If a's fire_count is greater than b's, a should come first (-1)
            if (a.fire_count > b.fire_count) {
                return -1;
            }
            // If b's fire_count is greater than a's, b should come first (1)
            if (a.fire_count < b.fire_count) {
                return 1;
            }
            // If they have the same fire_count, maintain their order (0)
                return 0;
        });

        // Return the sorted array to update the state
                return filteredSongs;
    });
}}>
            Hottest
            </button>

                {songToRender}
        </div>
    )
}

export default SongContainer;