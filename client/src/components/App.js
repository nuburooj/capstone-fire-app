import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import UserSignup from "./user_components/UserSignup";

function App() {
  return (
    <div>
      <div classname="App">
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<UserSignup />} />
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  )
}

export default App;
