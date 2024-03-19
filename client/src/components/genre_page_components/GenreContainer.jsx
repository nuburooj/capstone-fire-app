import React from 'react';
import GenreObject from './GenreObject';
import './GenreStyles.css';

function GenreContainer({renderGenre}){

    const genreToRender = renderGenre.map((genreObj) => {
        return(
            <div key={genreObj.id}>
                <GenreObject {...genreObj} />
            </div>
        )
    })

    return(
        <div className="genre-header">
            <h1>Genres</h1>
            {genreToRender}
        </div>
    )
}

export default GenreContainer;