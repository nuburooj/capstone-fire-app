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
            <div className="edit-genre-form">
      <div className="form-group">
        <label htmlFor="genre_name">Genre Name</label>
        <input
          id="genre_name"
          name="genre_name"
          className="input-field"
          value={editData.genre_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="genre_description">Genre Description</label>
        <textarea
          id="genre_description"
          name="genre_description"
          className="textarea-field"
          value={editData.genre_description}
          onChange={handleChange}
        />
      </div>
      <button className="save-button" onClick={handleSave}>Save</button>
      <button className="cancel-button" onClick={handleCancel}>Cancel</button>
    </div>
  );
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