import React, { use } from 'react'
import { useState, useEffect } from "react";
import Btn from './btn'
import './slate.css'


const slate = (prop) => {
    return (
        <div className='slate' >
            <div className="leftside">
                <h2 className="title">{prop.title}</h2>
                <div className="indicator">{prop.isPublic ? "public" : "private"}</div>
            </div>
            <div className="rightside">
                <Btn header="Info" variant="primary" onClick={prop.onClick} />
                <Btn header="Logs" variant="secondary" className="but-disabled" onClick={prop.onLogsclick}/>

            </div>
        </div>
    )
}

export default slate
