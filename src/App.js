import React  from 'react';
import Welcome from './Components/Welcome/Welcome';
import Home from './Components/Home/Home';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';


function App() {
 

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />}>
        </Route>
      </Routes>
    </Router>
    </>
  );
}



export default App;
