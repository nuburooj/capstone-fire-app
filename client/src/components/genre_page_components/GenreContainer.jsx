import React from 'react';
import GenreObject from './GenreObject';
import './GenreStyles.css';

function GenreContainer({renderGenre, onSave, onDelete}){

    const genreToRender = renderGenre.map((genreObj) => {
        return(
            <div key={genreObj.id}>
                <GenreObject {...genreObj} onSave={onSave} onDelete={onDelete}/>
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