import React from 'react'
import { useState, useEffect } from 'react'
import { auth } from "../firebase";
import './Navbar.css'
import Account from './Account';
const Navbar = () => {

  const handlelogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  const [showAccount, setShowAccount] = useState(false);

  const handleacc = () => {
    setShowAccount(!showAccount);
  }
  
  return (
    <div className='nav'>
      <div className='left_profile'>
        <h2 className='brand'>Prufy</h2>
        <input type="text" className='search' placeholder='search' />
      </div>
      <ul className='right_profile'>
        <li onClick={handleacc}>Account</li>
        <li>About</li>
        <li onClick={handlelogout}>Logout</li>
      </ul>
      <Account show={showAccount} />
    </div> 
  )
}

export default Navbar
