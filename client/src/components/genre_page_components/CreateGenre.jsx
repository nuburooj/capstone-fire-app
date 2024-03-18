import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';

function CreateGenre(props){

    const [showCreateGenre, setShowCreateGenre] = useState(false);

    function handleClick(){
        setShowCreateGenre(!showCreateGenre);
    }

    const GenreTextInput = ({ label, ...props }) => {
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
                {showCreateGenre ? (
                <Formik
                    initialValues={{
                        genre_name: '',
                        genre_description: '',
                    }}
                    validationSchema={Yup.object({
                        genre_name: Yup.string()
                        .min(3, 'Name must be at least 3 characters long')
                        .required('Name is required'),
                        genre_description: Yup.string()
                        .min(6, 'Description must be at least 6 characters long')
                        .required('Description is required'),
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        fetch('http://localhost:5555/genres', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values),
                        })
                        .then(res => res.json())
                        .then(newGenre => {
                            props.onAddGenre(newGenre)
                            resetForm();
                            setSubmitting(false)
                        })
                    }}
                    
                    >
                <Form>
                    <GenreTextInput label="Name" name="genre_name" />
                    <GenreTextInput label="Description" name="genre_description" />
                    <button type="submit">Create Group</button>
                </Form>

                </Formik>
                ) : null}
            <button onClick={handleClick}>{showCreateGenre ? "Cancel" : "Create A Genre"}</button>
            </div>
            )

    }


export default CreateGenre;