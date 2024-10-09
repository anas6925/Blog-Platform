import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/LoginSignUp/Signup";
import Login from "./components/LoginSignUp/Login";
import BlogManager from "./components/BlogManager/BlogManager";
import AllBlogs from "./components/BlogManager/AllBlogs";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Only set isAuthenticated after login or when token is present
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // If the app is still loading the authentication state, show a loader
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {/* Only show NavigationBar if the user is authenticated */}
      {isAuthenticated && (
        <NavigationBar setIsAuthenticated={setIsAuthenticated} />
      )}

      <ToastContainer />

      <Routes>
        <Route path="/" element={<Signup />} />
        {!isAuthenticated && (
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        )}

        {/* Ensure only authenticated users can access BlogManager and AllBlogs */}
        {isAuthenticated && (
          <>
            <Route
              path="/BlogManager"
              element={<BlogManager setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/AllBlogs"
              element={<AllBlogs setIsAuthenticated={setIsAuthenticated} />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
