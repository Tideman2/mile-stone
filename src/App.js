import React  from 'react';
import Welcome from './Components/Welcome/Welcome';
import Home from './Components/Home/Home';
import Callback from './Components/Callback/Callback';
import SpotifyAuth from './Components/SpotifyAuth/SpotifyAuth';
import MyProvider from './Components/contexts/Provider';
import Layout from './Components/layout/Layout';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


function App() { 

  return (
    <>
    <Router>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="/home" element={<MyProvider>
          <Layout> 
          <Home />
          </Layout>
        </MyProvider>
          } />
        <Route path="/callback" element={<Callback />} />
        <Route path="/login" element={<SpotifyAuth />} />
      </Routes>
    </Router>
    </>
  );
}



export default App;
