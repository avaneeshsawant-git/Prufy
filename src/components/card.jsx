import React from 'react'
import { useState ,useEffect} from 'react'
import './card.css'
import close from '../assets/close.svg'
import add from '../assets/add.svg'

const Card = (prop) => {
  useEffect(() => {
    setDesc(prop.task?.description || "");
  }, [prop.task]);



  const [editing, setEditing] = useState(false);
  const [desc, setDesc] = useState(prop.task?.description || "");
  return (
    <div className={`card ${prop.isOpen ? "open" : ""}`}>
      <img className='close' src={close} alt="close" onClick={prop.onClick} />
      <h1 className="card_title">{prop.task?.task}</h1>
      {editing ? (
        <textarea
          className="desc_input"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              prop.onUpdate(desc);
              setEditing(false);
            }
          }}
          onBlur={() => {
            prop.onUpdate(desc);
            setEditing(false);
          }}

          autoFocus
          placeholder="Add description..."
        />
      ) : (
        <p
          className="desc_text"
          onClick={() => setEditing(true)}
        >
          {prop.task?.description || "Click to add description"}
        </p>
      )}
      <button className="card_button">Public/Private</button>
      <button className="card_DELETE" onClick={prop.onDelete}>Delete</button>
      <div className="date">Created on {prop.task?.createdAt}</div>
      <div className="status">Status: Active</div>

    </div>
  )
}

export default Card
