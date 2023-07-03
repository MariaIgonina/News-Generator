import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login/login';
import Home from './pages/home/home';
import Navbar from './components/navbar/navbar';
import NewPage from './pages/newPage/NewPage';
import { useState } from 'react';


function App() {

  const [searchIsOpen, setSearchIsOpen] = useState(false);

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
