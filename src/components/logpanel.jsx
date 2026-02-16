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

    const logs = prop.logs || [];

    const verticalchange = () => {
        setVertical(v => !v);
    }

    const handleLogchangeTitle = (e) => {
        setlog({ ...log, title: e.target.value });
    }

    const handleLogchangeFile = (e) => {
        const selectedFile = e.target.files[0];
        setlog({ ...log, file: selectedFile });
    }

    // 🔥 CHANGED: Now async because we upload to Cloudinary
    const handleupload = async () => {
        if (log.title.trim() === "") {
            alert("Please enter a log entry.");
            return;
        }

        let fileUrl = null; // 🔥 NEW: will store Cloudinary URL

        // 🔥 NEW: Upload to Cloudinary if file exists
        if (log.file) {
            const formData = new FormData();
            formData.append("file", log.file);
            formData.append("upload_preset", "prufy_logs"); // 🔥 CHANGE THIS
            // 🔥 Replace YOUR_UPLOAD_PRESET with your preset name

            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dofc7d28a/upload", // 🔥 CHANGE THIS
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await res.json();
            fileUrl = data.secure_url; // 🔥 Get permanent URL
        }

        // 🔥 CHANGED: Send fileUrl instead of File object
        await prop.addlog(prop.taskId, {
            title: log.title,
            fileUrl: fileUrl // 🔥 Store URL only
        });

        setlog({ title: "", file: null });
        setVertical(false);
    }

    const trimName = (name) => {
        return name.length > 20 ? name.slice(0, 20) + "..." : name;
    };

    const formatDateTime = (timestamp) => {
        if (!timestamp) return "";

        const date = timestamp.seconds
            ? new Date(timestamp.seconds * 1000)
            : new Date(timestamp);

        return date.toLocaleString();
    };

    // 🔥 CHANGED: Preview now uses fileUrl (no blob logic anymore)
    const handlepreview = (log) => {
        if (log.fileUrl) {
            window.open(log.fileUrl, "_blank");
        }
    }

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
                                <div className='loged_text'>
                                    {/* 🔥 CHANGED: Use fileUrl instead of log.file */}
                                    <span className='log_file_name' onClick={() => handlepreview(log)}>
                                        {log.fileUrl ? trimName(log.fileUrl.split('/').pop()) : "No file attached"}
                                    </span>
                                    <span className="logtitle">{log.title}</span>
                                    <span className="log_time">{formatDateTime(log.createdAt)}</span>
                                </div>
                            </div>
                        )))
                    }
                </div>
            </div>
        </div>
    )
}

export default logpanel
