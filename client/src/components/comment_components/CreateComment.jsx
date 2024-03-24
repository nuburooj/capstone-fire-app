import React, { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

function CreateComment({onAddComment, songId}){

    const [showCreateComment, setShowCreateComment] = useState(false);



    function handleClick(){
        setShowCreateComment(!showCreateComment);
    }
    
    const CommentTextInput = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <div className="form-group">
                <label htmlFor={props.id || props.name}>{label}</label>
                <input className='text-input' {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </div>
        );
    }
    
        return (
        <div>
            {showCreateComment ? (
            <Formik
                initialValues={{
                    comment_description: '',
                    user_id: '',
                    song_id: songId
                }}
                validationSchema={Yup.object({
                    comment_description: Yup.string()
                    .min(1, 'Comment must be at least 1 characters long')
                    .required('Comment is required'),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    fetch('http://localhost:5555/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment_description: values.comment_description,
                    user_id: values.user_id,
                    song_id: songId
                }),
                })
                .then(res => res.json())
                .then(newComment => {
                    onAddComment(newComment)
                    resetForm();
                    setSubmitting(false)
                })
          }}

            >
            <Form>
                <CommentTextInput label="Add Comment" name="comment_description" />
                <button type="submit">Submit</button>
            </Form>

            </Formik>
            ) : null}
            <button onClick={handleClick}>{showCreateComment ? "Cancel" : "Create A Comment"}</button>
        </div>
            )
            
}
export default CreateComment;