import React from "react";
import NavBar from "./NavBar";

import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function PostPage() {

 const navigate = useNavigate()

    const SongPostTextInput = ({lable, ...props}) => {
        
        const [field, meta] = useField(props)
        return(
            <div className='form-group'>
                <lable htmlFor={props.id || props.name}>{lable}</lable>
                <input className='text-input' {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className='error'>{meta.error}</div>
                ) : null}
            </div>
        )
    }

    return(
    <div>
        <NavBar />
        <div className='song-form-heading'>
            <h1>Song Form</h1>
            <div> 
                <Formik
                    initialValues={{
                        song_title: "",
                        song_description: "",
                        song_artwork: "",
                        upload_file: "",
                        
                    }}
                    validationSchema={Yup.object({
                        song_title: Yup.string()
                        .required('Song Title is required.'),
                        song_description: Yup.string()
                        .required('Song Description is required.'),
                        song_artwork: Yup.string()
                        .required('Artwork is required'),
                        upload_file: Yup.string()
                        .required('Password is required')
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        
                        fetch(`http://localhost:5555/songs`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(values)    
                        })
                        .then(res => res.json())
                        .then(values => {
                            console.log(values)
                            navigate('/')
                        })
                        .then( setSubmitting(false), resetForm() );
                    }}
                    >
                        <Form className='Song-Form'>
                            <SongPostTextInput type="text" name="song_title" lable="Track Title" />
                            <SongPostTextInput type="text" name="song_description" lable="Description" />
                            <SongPostTextInput type="text" name="song_artwork" lable="Artwork" />
                            <SongPostTextInput type="text" name="upload_file" lable="Audio File" />
                            <button type="submit">Is it Fire?</button>
                        </Form>
                </Formik>
            </div>
        </div>
    </div>
    )
    
}

export default PostPage;
