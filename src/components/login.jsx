import React from 'react'
import { useState, useEffect } from 'react'
import './login.css'
import Signup from './signup.jsx'
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const login = (prop) => {
    const [signup, setSignup] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    useEffect(() => {
        setSignup(false);
    }, []);


    const handleSIGNUP = () => {
        setSignup(true);
    }

    const handlesub = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged in successfully!", { position: 'top-center' });
        } catch (error) {
            toast.error("Error logging in: " + error.message, { position: 'bottom-center' });
        }
    }

    return (

        <div className="page">
            {signup ? <Signup /> :
            <>
                <div className="up">
                    <h1>Welcome to Prufy</h1>
                    <p>Track your work with proof, not just promises.</p>
                </div>
                <div className="login-container">
                    <h2 >Login</h2>
                    <form className="login-form" onSubmit={handlesub}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className='btnn'>Login</button>
                    </form>
                    <button className='signup' onClick={handleSIGNUP}>signup</button>
                </div>
            </>
            }
        </div>

    )
}

export default login