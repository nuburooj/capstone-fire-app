import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import CreateGenre from "./genre_page_components/CreateGenre";
import GenreContainer from "./genre_page_components/GenreContainer";
import GenreObject from "./genre_page_components/GenreObject";

function GenrePage() {

    const [renderGenre, setRenderGenre] = useState([]);

    const addGenre = (newGenre) => {
        console.log(newGenre); // Log the newCategory to verify its structure
        if (newGenre && newGenre.id) { // Ensure newCategory is not undefined and has an id
            setRenderGenre(prevGenres => [...prevGenres, newGenre]);
        } else {
            console.error('Attempted to add an undefined or invalid genre:', newGenre);
        }
    };


    useEffect(() =>{
        fetch(`http://localhost:5555/genres`).then(res => {
            if (res.status != 200){
                console.log("error")
                return
            }
            res.json().then(data => {
                if (data != null){
                    setRenderGenre(data)
                    console.log(data)
                }
            })
        })
    }, []);

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <h1>Genres Page</h1>
            <div>
                <CreateGenre onAddGenre={addGenre} />
                <GenreContainer renderGenre={renderGenre} />
            </div>
        </div>
    )
}

export default GenrePage;