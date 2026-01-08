import React from 'react'
import { useState, useRef } from 'react'
import './signup.css'
const signup = () => {
    return (
        <div className="page">
            <div className="signup-container">
                <h2 >Sign up</h2>
                <form className="signup-form">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </form>
                    <button type="submit" className='btnn'>Sign up</button>
            </div>
        </div>
    )
}

export default signup
