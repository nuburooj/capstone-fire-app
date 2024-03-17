import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import UserSignup from "./user_components/UserSignup";
import UserLogin from "./user_components/UserLogin";
import UserContext from "./user_components/UserContext";
import Home from "./Home";

function App() {
  const [currentUser, setCurrentUser] = useState({})
  return (
    <div>
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path='/signup' element={<UserSignup />} />
              <Route path='/login' element={<UserLogin />} />
              <Route path='/' element={<Home />} />
            </Routes>
          </BrowserRouter>
        </div>
      </UserContext.Provider>
    </div>
  )
}

export default App;
