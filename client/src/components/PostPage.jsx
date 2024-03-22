import React, { useState } from "react";
import NavBar from "./NavBar";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ImageUploadWidget from "./upload_widget_components/ImageUploadWidget";
import TrackUploadWidget from "./upload_widget_components/TrackUploadWidget";
function PostPage() {

 const navigate = useNavigate()
 const [imageLink, setImageLink] = useState("")
 const [trackLink, setTrackLink] = useState("")

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
                enableReinitialize
                    initialValues={{
                        song_title: "",
                        song_description: "",
                        song_artwork: imageLink,
                        upload_file: trackLink,
                        genre_id: ""
                        
                    }}
                    validationSchema={Yup.object({
                        song_title: Yup.string()
                        .required('Song Title is required.'),
                        song_description: Yup.string()
                        .required('Song Description is required.'),
                        song_artwork: Yup.string()
                        .required('Please select Artwork to upload.'),
                        upload_file: Yup.string()
                        .required('Please select a Track to upload.'),
                        genre_id: Yup.string()
                        .required('Genre id is required.')
                        
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        const submmissionValues = {...values, user_picture: imageLink, upload_file: trackLink};
                        
                        fetch(`http://localhost:5555/songs`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(submmissionValues)    
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
                            <SongPostTextInput type="text" name="genre_id" lable="Genre ID" />
                            <ImageUploadWidget onSetImage={setImageLink}/>
                            {imageLink && <img src={imageLink} alt="Uploaded picture" />}
                            <TrackUploadWidget onSetTrack={setTrackLink}/>
                            {trackLink && <audio src={trackLink} alt="Uploaded track" />}
                            <button type="submit">Is it Fire?</button>
                        </Form>
                </Formik>
            </div>
        </div>
    </div>
    )
    
}

export default PostPage;
