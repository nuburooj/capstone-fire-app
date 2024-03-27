import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import UserSignup from "./user_components/UserSignup";
import UserLogin from "./user_components/UserLogin";
import UserContext from "./user_components/UserContext";
import Home from "./Home";
import PostPage from "./PostPage";
import GenrePage from "./GenresPage";
import CurrentGenre from "./genre_page_components/CurrentGenre";
import CurrentSong from "./home_components/CurrentSong";
import MePage from "./MePage";


function App() {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(()=> {
    const userInSession = sessionStorage.getItem('currentUser')
    if (userInSession){
      const user = JSON.parse(userInSession)
      setCurrentUser(user)
    }
  }, [])

  
  return (
    <div>
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path='/signup' element={<UserSignup />} />
              <Route path='/login' element={<UserLogin />} />
              <Route path='/' element={<Home />} />
              <Route path='/post' element={<PostPage />} />
              <Route path = "/genres" element = {<GenrePage />} />
              <Route path = "/genres/:id" element = {<CurrentGenre />} />
              <Route path = "/songs/:id" element={<CurrentSong />} />
              <Route path = '/me' element={<MePage />} /> 
            </Routes>
          </BrowserRouter>
        </div>
      </UserContext.Provider>
    </div>
  )
}

export default App;
