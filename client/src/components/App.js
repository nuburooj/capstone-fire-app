import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import UserSignup from "./user_components/UserSignup";
import UserLogin from "./user_components/UserLogin";

function App() {
  return (
    <div>
      <div classname="App">
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<UserSignup />} />
            <Route path='/login' element={<UserLogin />} />
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  )
}

export default App;
