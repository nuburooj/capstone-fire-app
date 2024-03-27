import React, {useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './UserSignupStyles.css';
import ImageUploadWidget from '../upload_widget_components/ImageUploadWidget';

function UserSignup(){

    const navigate = useNavigate()
     const [imageLink, setImageLink] = useState("");

    const SignupTextInput = ({label, ...props}) => {
        
        const [field, meta] = useField(props)
        return(
            <div className='form-group'>
                <label htmlFor={props.id || props.name}>{label}</label>
                <input className='text-input' {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className='error'>{meta.error}</div>
                ) : null}
            </div>
        )
    }

    return(
        <div className='signup-heading'>
            <h1>Signup</h1>
            <div> 
                <Formik
                    enableReinitialize
                    initialValues={{
                        username: "",
                        email: "",
                        password: "",
                        user_picture: imageLink,
                        Socials: ""
                    }}
                    validationSchema={Yup.object({
                        username: Yup.string()
                        .required('Username is required.'),
                        email: Yup.string()
                        .required('Email is required.'),
                        password: Yup.string()
                        .required('Password is required'),
                        user_picture: Yup.string()
                        .required('Please upload a picture.'),
                        Socials: Yup.string()
                        .required('Please provide a link to your Spotify.')
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        
                        // Ensure the user_picture field is updated with the latest imageLink
                        const submissionValues = { ...values, user_picture: imageLink };
                        fetch(`http://localhost:5555/signup`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(submissionValues)    
                        })
                        .then(res => res.json())
                        .then(values => {
                            console.log(values)
                            navigate('/login')
                        })
                        .then( setSubmitting(false), resetForm() );
                    }}
                    >
                        <Form className='SubmitForm'>
                            <ImageUploadWidget onSetImage={setImageLink}/>
                            {imageLink && <img src={imageLink} alt="Uploaded picture" />}
                            <SignupTextInput type="text" name="username" label="Username" />
                            <SignupTextInput type="email" name="email" label="Email" />
                            <SignupTextInput type="password" name="password" label="Password" />
                            <SignupTextInput type="text" name="Socials" label="Spotify" />
                            <button type="submit">Submit</button>
                            
                        </Form>
                </Formik>
            </div>
        </div>
    )
    
}

export default UserSignup;

