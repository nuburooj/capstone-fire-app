import React from 'react';
import './GenreStyles.css';

function GenreObject({
    id,
    genre_name,
    genre_description,
}){
    return(
        <div className="genre-container">
            <h1>{genre_name}</h1>
            <p>{genre_description}</p>
            <p>ID: {id}</p>
        </div>
    )
}

export default GenreObject;