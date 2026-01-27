// Imports at the very top of the file
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from "./admin/adminlogin/Dashboard";
import Page from './admin/Page/Pages';

import AdminLogin from "./admin/adminlogin/AdminLogin";
import Homepage from "./userinterface/Homepage";
import Team from "./userinterface/Team";
import AboutUs from "./userinterface/AboutUs";




import Events from "./userinterface/Events";
import Contact from "./userinterface/Contact";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/Adminlogin" element={<AdminLogin />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/page" element={<Page />} />
      <Route path="/team" element={<Team />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/events" element={<Events />} />
      <Route path="/contact" element={<Contact />} />


    </Routes>
  );
}

export default App;
