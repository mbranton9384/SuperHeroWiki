import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({ currentUser, logout }) {
  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <Link to='/'>Home</Link>
        <Link to='/heroes'>Heroes</Link>
      </div>
      <div className='navbar-right'>
        {currentUser ? (
          <>
            <Link to='/user'>Welcome, {currentUser.username}</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;




