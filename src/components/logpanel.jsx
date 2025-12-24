import React from 'react'
import './logpanel.css'
import close from '../assets/close-log.svg'
import add from '../assets/add.svg'
import { useState } from 'react'


const logpanel = (prop) => {
    const [vertical, setVertical] = useState(false)

    const verticalchange = (e) => {
        setVertical(vertical => !vertical   );
    }


    return (
        <div className={`panel ${prop.isOpen ? "open" : ""}`}>
            <img className='add_icon' src={add} alt="add" onClick={verticalchange} />
            <img className="close-icon" src={close} alt="Close" onClick={prop.onCloseClick}/>
            <div className="upper" style={{ height: vertical ? '8rem' : '3rem' }}>Log-panel</div>
            <div className={`addlog ${vertical ? 'visible' : ''}`}>
                <input className='loginput' type="text" placeholder='Add log entry...' />
                <button className='logbutton'>Add Log</button>

            </div>
            <div className="lower"></div>
        </div>
    )
}

export default logpanel
