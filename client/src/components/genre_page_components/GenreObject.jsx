import React, { useState } from 'react';
import './GenreStyles.css';

function GenreObject({
    id,
    genre_name,
    genre_description,
    onSave,
    onDelete
}){

    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({
        id: id,
        genre_name: genre_name,
        genre_description: genre_description,
    })

    function handleEdit(){
        setEditMode(true);
    }

    function handleChange(e){
        const {name, value} = e.target
        setEditData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSave(){
        onSave(id, editData);
        setEditMode(false);
    }

    function handleCancel(){
        setEditMode(false);
    }

    function handleDelete(){
        //set option for confirm deletion 
        const confirmDelete = window.confirm('Are you sure you want to delete?')

        if (confirmDelete){
            onDelete(id);
        }
    }

    if (editMode) {
        return (
            <div>
                <input
                name = "genre_name"
                value = {editData.genre_name}
                onChange = {handleChange}
                />
                <textarea
                name = "genre_description"
                value = {editData.genre_description}
                onChange = {handleChange}
                />
                <button onClick = {handleSave}>Save</button>
                <button onClick = {handleCancel}>Cancel</button>
            </div>
        )
    }


    return(
        <div className="genre-container">
            <h1>{genre_name}</h1>
            <p>{genre_description}</p>
            <p>ID: {id}</p>
            <button onClick = {handleEdit}>Edit</button>
            <button onClick = {handleDelete}>Delete</button>
        </div>
    )
}

export default GenreObject;