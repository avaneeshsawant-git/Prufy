import React from 'react'
import { useState } from 'react'
import './card.css'
import close from '../assets/close.svg'

const Card = (prop) => {
  const [editing, setEditing] = useState(false);
  const [desc, setDesc] = useState("");
  return (
    <div ref={prop.ref} className='card'>
      <img className='close' src={close} alt="close" onClick={prop.onClick} />
      <h1 className="card_title">{prop.title}</h1>
      {editing ? (
        <textarea
          className="desc_input"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
          // onBlur={() => setEditing(false)}
          autoFocus
          placeholder="Add description..."
        />
      ) : (
        <p
          className="desc_text"
          onClick={() => setEditing(true)}
        >
          {desc || "Click to add description"}
        </p>
      )}
      <button className="card_button">visibiltiy</button>
      <div>Status: Active</div>

    </div>
  )
}

export default Card
