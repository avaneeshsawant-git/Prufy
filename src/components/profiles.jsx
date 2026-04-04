import React from 'react'
import './profiles.css'

const Profiles = ({ user, onClick }) => {
  return (
    <div className="profiles" onClick={onClick}>
      <div className="profilepic">
        <img src={`https://ui-avatars.com/api/?name=${user.username}`} alt="Profile" />
      </div>
      <span>{user.username}</span>
    </div>
  );
};

export default Profiles;
