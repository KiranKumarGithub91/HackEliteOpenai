import React, { useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ChatContext } from './components/ChatContext';
import Navbar from './components/Navbar/Navbar';
import Welcome from './components/Welcome';
import './index.css';

function App() {
  useContext(ChatContext)
  return (
    <div className='gradient-bg-welcome'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Welcome/>}/>
        </Routes>
    </div>
  )
}

export default App;