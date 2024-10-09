import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/LoginSignUp/Signup";
import Login from "./components/LoginSignUp/Login";
import BlogManager from "./components/BlogManager/BlogManager";
import AllBlogs from "./components/BlogManager/AllBlogs";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/BlogManager" element={<BlogManager />} />
        <Route path="/AllBlogs" element={<AllBlogs />} />
      </Routes>
    </Router>
  );
}

export default App;
