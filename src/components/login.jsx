import React from 'react'
import { useState, useRef } from 'react'
import './login.css'
import Signup from './signup.jsx'

const login = (prop) => {
    const [signup, setSignup] = useState(false)


    const handleSIGNUP = () => {
        setSignup(true);
    }

    const handlelogin = () => {
        if (document.getElementById('email').value === "") {
            // alert("Email cannot be empty");
        }
        else if (document.getElementById('password').value === "") {
            // alert("Password cannot be empty");
        } else {
            prop.onLoginClick();
            return;
        }

    }
    return (

        <div className="page">
            {signup ? <Signup /> :
                <div className="login-container">
                    <h2 >Login</h2>
                    <form className="login-form">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </form>
                        <button type="submit" className='btnn' onClick={handlelogin}>Login</button>
                    <button className='signup' onClick={handleSIGNUP}>signup</button>
                </div>
            }
        </div>

    )
}

export default login
