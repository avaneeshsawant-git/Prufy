import React from 'react'
import { useState, useEffect } from 'react'
import { auth } from "../firebase";
import './Navbar.css'
import Account from './Account';
import Sidesearch from './sidesearch';
const Navbar = (prop) => {

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
  const handlechange = (e) => {
    if (e.target.value.trim() !== "") {
      prop.onupdate(true);
    } else {
      prop.onupdate(false);
    }
  }


  return (
    <div className='nav'>
      <div className='left_profile'>
        <h2 className='brand'>Prufy</h2>
        <input type="text" className='search' placeholder='search people' onChange={handlechange} />
      </div>
      <ul className='right_profile'>
        <li onClick={handleacc}>Account</li>
        <li>About</li>
        <li onClick={handlelogout}>Logout</li>
      </ul>
      <Account show={showAccount} />
      {/* <Sidesearch /> */}
    </div>
  )
}

export default Navbar
