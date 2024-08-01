import React  from 'react';
import Welcome from './Components/Welcome/Welcome';
import Home from './Components/Home/Home';
import Callback from './Components/Callback/Callback';
import SpotifyAuth from './Components/SpotifyAuth/SpotifyAuth';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';


function App() {
 

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/login" element={<SpotifyAuth />} />
      </Routes>
    </Router>
    </>
  );
}



export default App;
