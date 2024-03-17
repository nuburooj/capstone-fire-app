import React from 'react';
import { useUser } from './user_components/UserContext';
import AccountOptions from './AccountOptions';
import NavBar from './NavBar';

function Home() {

    const {currentUser, setCurrentUser} = useUser();

    const user_name = currentUser.username

    return(
        <div>
            <NavBar />
            <h1>Home</h1>
            <p>{user_name} is Fired Up!</p>
        </div>
    )
}

export default Home;