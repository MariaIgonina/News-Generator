import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login/login';
import Home from './pages/home/home';
import Navbar from './components/navbar/navbar';
import NewPage from './pages/newPage/NewPage';
import { useState } from 'react';
import { setToken } from './store/authSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


function App() {

  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.user) {
      dispatch(setToken(localStorage.user))
    }
  }, [])

  return (
    <BrowserRouter>
      <Navbar
        setSearchIsOpen={setSearchIsOpen}
        searchIsOpen={searchIsOpen}
      />
      <Routes>

        <Route path="/"
          element={<Home
            searchIsOpen={searchIsOpen}
            setSearchIsOpen={setSearchIsOpen}
          />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/thisnew/:id" element={<NewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
