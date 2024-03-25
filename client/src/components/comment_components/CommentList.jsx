import React, { useEffect, useState } from 'react';
import Comment from './Comment'; // Assume this is the component that allows editing and deleting
import CreateComment from './CreateComment';

function CommentList({ user, songId, onAddComment }) {
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        
        fetch(`http://localhost:5555/songs/${songId}/comments`)
            .then(response => response.json())
            .then(data => {
                setComments(data);
            });
    }, [songId]);

    const handleNewComment = (newComment) => {
        setComments(prevComments => [...prevComments, newComment]);
    };

 
    function handleDeleteComment(id) {
        fetch(`http://localhost:5555/comments/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
                setComments(prevComments => 
                    prevComments.filter(comment => comment.id !== id)
                );
        })
    }

  
    function handleEditComment(editData){
        debugger
        fetch(`http://localhost:5555/comments/${editData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment_description: editData.comment_description }),
        })
     .then(res => res.json())
     .then(data => {
         
         console.log(data)
        setComments(prevComments => prevComments.map(comment => 
            comment.id === data.id ? data : comment
        ));
    })
    // .catch(error => {
    //     console.log(error)
    // })
    }

    useEffect(() => {
        if (onAddComment) {
            setComments(prevComments => [...prevComments, onAddComment]);
        }
    }, [onAddComment]);

    return (
        <div>
            <div>
                <h1>Comments</h1>
             <CreateComment songId={songId} onAddComment={handleNewComment}/>
            {comments.map(comment => (
                <Comment
                key={comment.id}
                comment={comment}
                onDelete={handleDeleteComment}
                onEdit={handleEditComment}
                user={user}
                />
                ))}
            </div>
        </div>
    );
}

export default CommentList;