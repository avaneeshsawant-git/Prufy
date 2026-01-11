import React from 'react'
import { useState, useEffect } from 'react'
import { auth } from "../firebase";
import './Navbar.css'
const Navbar = () => {

  const handlelogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
  
  return (
    <div className='nav'>
      <div className='left_profile'>
        <h2 className='brand'>Prufy</h2>
        <input type="text" className='search' placeholder='search' />
      </div>
      <ul className='right_profile'>
        <li>Account</li>
        <li>About</li>
        <li onClick={handlelogout}>logout</li>
      </ul>
    </div>
  )
}

export default Navbar
