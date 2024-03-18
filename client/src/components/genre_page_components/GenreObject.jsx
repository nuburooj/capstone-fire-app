import React from 'react';

function GenreObject({
    id,
    genre_name,
    genre_description,
}){
    return(
        <div>
            <h1>{genre_name}</h1>
            <p>{genre_description}</p>
            <p>ID: {id}</p>
        </div>
    )
}

export default GenreObject;