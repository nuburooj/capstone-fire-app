import React from 'react';
import SongObject from './SongObject';

function SongContainer({songs}){

    const songToRender = songs.map((songObj) => {
        return(
            <div key={songObj.id}>
                <SongObject {...songObj}/>
            </div>
        )
    })

    return(
        <div>
            <h1>Songs</h1>
            {songToRender}
        </div>
    )
}

export default SongContainer;