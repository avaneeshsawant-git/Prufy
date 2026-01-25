import { useState, useEffect } from "react";
import "./card.css";
import close from "../assets/close.svg";

const Card = (prop) => {
  const task = prop.task;

  const [editing, setEditing] = useState(false);
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (task) {
      setDesc(task.description || "");
    }
  }, [task?.id, task?.description]);

  const saveDescription = () => {
    if (task && desc !== task.description) {
      prop.onUpdate(desc);
    }
    setEditing(false);
  };

  return (
    <div className={`card ${prop.isOpen && task ? "open" : ""}`}>
      {!task ? null : (
        <>
          <img
            className="close"
            src={close}
            alt="close"
            onClick={prop.onClick}
          />

          <h1 className="card_title">{task.task}</h1>

          {editing ? (
            <textarea
              className="desc_input"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              onBlur={saveDescription}
              autoFocus
              placeholder="Add description..."
            />
          ) : (
            <p
              className="desc_text"
              onClick={() => setEditing(true)}
            >
              {task.description || "Click to add description"}
            </p>
          )}

          <button className="card_button">Public / Private</button>

          <button
            className="card_DELETE"
            onClick={(e) => {
              e.stopPropagation();
              prop.onDelete(prop.task.id);
            }}
          >
            Delete
          </button>


          <div className="date">
            Created on{" "}
            {task.createdAt?.toDate
              ? task.createdAt.toDate().toLocaleString()
              : ""}
          </div>

          <div className="status">Status: Active</div>
        </>
      )}
    </div>
  );
};

export default Card;
