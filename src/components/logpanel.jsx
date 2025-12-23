import React from 'react'
import './logpanel.css'
import close from '../assets/close-log.svg'

const logpanel = () => {
    return (
        <div className='panel'>
            <img className="close-icon" src={close} alt="Close" />
            <div className="upper">Log-panel</div>
            <div className="lower"></div>
        </div>
    )
}

export default logpanel
