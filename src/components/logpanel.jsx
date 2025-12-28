import React from 'react'
import './logpanel.css'
import close from '../assets/close-log.svg'
import add from '../assets/add.svg'
import { useState } from 'react'


const logpanel = (prop) => {
    const [vertical, setVertical] = useState(false)
    const [log, setlog] = useState({
        title: "",
        file: null
    })

    const logs = prop.activelog?.logs || [];

    const verticalchange = (e) => {
        setVertical(vertical => !vertical);
    }

    const handleLogchangeTitle = (e) => {
        const value = e.target.value;
        setlog({ ...log, title: value });
        console.log(log.title);
    }

    const handleLogchangeFile = (e) => {
        const selectedFile = e.target.files[0];
        setlog({ ...log, file: selectedFile });
        console.log(log.file);
    }

    const handleupload = () => {
        if (log.title.trim() === "") {
            alert("Please enter a log entry.");
            return;
        }
        const newLog = {
            id: crypto.randomUUID(),
            title: log.title,
            file: log.file,
            createdAt: new Date().toISOString()
        };
        prop.onUpdateLog(newLog);
        setlog({ title: "", file: null });
        setVertical(false);

    }

    const trimName = (name, max = 20) => {
        return name.length > max ? name.slice(0, max) + "..." : name;
    };

    const formatDateTime = (iso) => {
        const d = new Date(iso);
        return d.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };



    return (
        <div className={`panel ${prop.isOpen ? "open" : ""}`}>
            <img className='add_icon' src={add} alt="add" onClick={verticalchange} />
            <img className="close-icon" src={close} alt="Close" onClick={prop.onCloseClick} />
            <div className="upper" style={{ height: vertical ? '8rem' : '3rem' }}>Log-panel</div>

            <div className={`addlog ${vertical ? 'visible' : ''}`}>
                <input type="file" id='fileUpload' hidden onChange={handleLogchangeFile} />
                <label className='fileinput' htmlFor="fileUpload">Attach File</label>
                <input className='loginput' type="text" placeholder='Add log entry...' value={log.title} onChange={handleLogchangeTitle} />
                <button className='logbutton' onClick={handleupload}>Upload Proof</button>

            </div>
            <div className="lower">
                <div className="logs_container" style={{ height: vertical ? '6rem' : '11rem' }}>
                    {logs.length === 0 ? (
                        <p className='empty_log'>No logs available.</p>
                    ) : (
                        logs.map(log => (
                            <div key={log.id} className="log_entry">
                                <div className='loged_text'>{log.file ? trimName(log.file.name) : "No file attached"} : <span className="logtitle">{log.title}</span>
                                    <br /> <span className="log_time">{formatDateTime(log.createdAt)}</span>
                                </div>
                            </div>
                        )))}
                </div>

            </div>
        </div>

    )
}

export default logpanel
