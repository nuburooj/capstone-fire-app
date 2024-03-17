import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import UserSignup from "./user_components/UserSignup";
import UserLogin from "./user_components/UserLogin";
import UserContext from "./user_components/UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({})

  return (
    <div>
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
        <div classname="App">
          <BrowserRouter>
            <Routes>
              <Route path='/signup' element={<UserSignup />} />
              <Route path='/login' element={<UserLogin />} />
            </Routes>
          </BrowserRouter>
        </div>
      </UserContext.Provider>
    </div>
  )
}

export default App;
