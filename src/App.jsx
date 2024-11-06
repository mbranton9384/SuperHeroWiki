import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import HeroesPage from "./HeroesPage"; 
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import UserPage from "./UserPage";
import NavBar from "./NavBar";
import { UserProvider, useUser } from "./context/UserContext";

function App() {
  const { currentUser, setCurrentUser } = useUser();

  async function login({ username, password }) {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      setCurrentUser(response.data.user);
    } catch (err) {
      console.error("Login error", err);
      throw new Error("Login failed");
    }
  }

  async function signup({ username, password, firstName, lastName, email }) {
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        password,
        firstName,
        lastName,
        email,
      });
      setCurrentUser(response.data.user);
    } catch (err) {
      console.error("Signup error", err);
      throw new Error("Signup failed");
    }
  }

  function logout() {
    setCurrentUser(null);
  }

  return (
    <UserProvider>
      <BrowserRouter>
        <NavBar currentUser={currentUser} logout={logout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
          <Route path="/user" element={<UserPage currentUser={currentUser} />} />
          <Route path="/heroes" element={<HeroesPage currentUser={currentUser} />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;














