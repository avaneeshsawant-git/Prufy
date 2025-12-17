import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='nav'>
      <div className='left_profile'>
        <h2 className='brand'>proofy</h2>
        <input type="text" className='search' placeholder='search' />
      </div>
      <ul className='right_profile'>
        <li>Account</li>
        <li>About</li>
      </ul>
    </div>
  )
}

export default Navbar
