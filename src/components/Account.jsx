import React, { useState, useEffect } from 'react';
import { auth } from "../firebase";
import './Account.css';
import { onAuthStateChanged } from "firebase/auth";

const Account = (prop) => {

    const [acc, setacc] = useState({
        username: "",
        email: "",
        taskcount: 0,
        created: ""
    });

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setacc({
                    username: user.displayName || "N/A",
                    email: user.email || "N/A",
                    taskcount: 0,
                    created: user.metadata.creationTime || "N/A"
                });
            }
        });

        return () => unsub();
    }, []);

    return (
        <div className={`account ${prop.show ? 'open' : ''}`}>
            <div className="username">User Account : {acc.username}</div>
            <div className="email">Email : {acc.email}</div>
            <div className="taskcount">Tasks: {acc.taskcount}</div>
            <div className="created">Account Created : {acc.created}</div>
        </div>
    );
};

export default Account;