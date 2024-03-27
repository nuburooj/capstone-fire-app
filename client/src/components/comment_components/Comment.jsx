import React, {useState, useEffect} from "react";
import { useUser } from "../user_components/UserContext";

function Comment({  songUser, comment, onDelete, onEdit }) {
    console.log(comment)
    const [isEditing, setIsEditing] = useState(false);
    const {currentUser, setCurrentUser} = useUser()
    console.log(songUser)
    const [editData, setEditData] = useState({
        id: comment.id,
        comment_description: comment.comment_description
    })
    useEffect(() => {
        setEditData({
            id: comment.id,
            comment_description: comment.comment_description,
        });
    }, [comment]);

    function handleChange(e){
        const {name, value} = e.target
        setEditData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDelete = () => {
        onDelete(comment.id);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        onEdit(editData)
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                
                <form onSubmit={handleEditSubmit}>
                    <input
                        type="text"
                        name="comment_description"
                        value={editData.comment_description}
                        onChange={handleChange}
                    />
                    <button type="submit">Save</button>
                </form>

            ) : (
               
                <div>
                    {comment.user.user_picture && <img src={comment.user.user_picture} alt={comment.user.username} className="user-picture" />}
                     <h4>{comment.user.username}</h4>
                    <p>{comment.comment_description}</p>
                    <p>{comment.created_at}</p>
                    { currentUser.id === comment.user?.id &&(
                    <div>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Comment;