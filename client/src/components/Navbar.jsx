import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className='container'>
      <div className="logo-brand">
        <NavLink to="/">Website Builder</NavLink>
      </div>
      <nav className="navbar">
        <ul>
            <li><NavLink to="/signup">Signup</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/addBooks">Add Books</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
