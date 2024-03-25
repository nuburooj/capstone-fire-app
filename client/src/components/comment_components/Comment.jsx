import React, {useState, useEffect} from "react";
import { useUser } from "../user_components/UserContext";

function Comment({ user, comment, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const {currentUser, setCurrentUser} = useUser()
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
                    {user.user_picture && <img src={user.user_picture} alt={user.username} className="user-picture" />}
                     <h4>{user.username}</h4>
                    <p>{comment.comment_description}</p>
                    { currentUser.id === user.id &&(
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