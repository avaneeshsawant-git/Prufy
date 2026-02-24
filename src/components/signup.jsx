import React, { use } from 'react'
import { useState, useEffect } from 'react'
import './signup.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import Login from './login.jsx';
import { toast } from 'react-toastify';
const signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [login, setLogin] = useState(false)

    useEffect(() => {
        setLogin(false);
    }, []);


    const handlesub = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;

            await updateProfile(user, {
                displayName: username
            });

            await user.reload();

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                username: username,
                email: email
            });
            toast.success("User created successfully!", { position: 'top-center' });
            setLogin(true);
            setEmail("");
            setPassword("");
            setUsername("");
        } catch (error) {
            toast.error("Error creating user: " + error.message, { position: 'bottom-center' });
        }
    }

    return (
        <div className="page">
            {login ? <Login /> :
                <div className="signup-container">
                    <h2 >Sign up</h2>
                    <form className="signup-form" onSubmit={handlesub}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className='btnn'>Sign up</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default signup
