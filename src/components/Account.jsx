import React, { useState, useEffect } from 'react';
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import './Account.css';
import { onAuthStateChanged } from "firebase/auth";

const Account = (prop) => {

    const [acc, setacc] = useState({
        username: "",
        email: "",
        created: "",
        photoURL: ""
    });

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {


                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                const userData = userSnap.exists() ? userSnap.data() : {};

                setacc({
                    username: userData.username || "N/A",
                    email: user.email || "N/A",
                    created: user.metadata.creationTime || "N/A",
                    photoURL: userData.photoURL || ""
                });
            }
        });

        return () => unsub();
    }, []);

    return (
        <div className={`account ${prop.show ? 'open' : ''}`}>
            <div className="profilePicWrapper">
                <img
                    src={acc.photoURL || "https://ui-avatars.com/api/?name=" + acc.username}
                    alt="profile"
                    className="profilePic"
                />
            </div>
            <div className="block"></div>
            <div className="username">User Account : {acc.username}</div>
            <div className="email">Email : {acc.email}</div>
            <div className="taskcount">Tasks: {prop.count}</div>
            <div className="created">Account Created : {acc.created}</div>
        </div>
    );
};

export default Account;