import React from 'react'
import './sidesearch.css'
import Profiles from './profiles'

const Sidesearch = ({ ison, users, onUserSelect }) => {
  return (
    <div className={`sidesearch ${ison ? 'open' : ''}`}>
      <div className="header">See people's work</div>

      <div className="pof">
        {users.length === 0 ? (
          <div>No users found</div>
        ) : (
          users.map((user) => (
            <Profiles
              key={user.id}
              user={user}
              onClick={() => {
                console.log("Clicked user:", user.id);
                onUserSelect(user.id);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Sidesearch
