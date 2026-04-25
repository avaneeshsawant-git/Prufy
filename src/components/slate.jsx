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
                <Btn header="Info" variant="primary" onClick={(e) => {
                    e.stopPropagation();   
                    e.preventDefault();    
                    prop.onCardsclick && prop.onCardsclick();
                }} />
                <Btn header="Logs" variant="primary" className="but-disabled" onClick={(e) => {
                    e.stopPropagation();   
                    e.preventDefault();    
                    prop.onLogsclick && prop.onLogsclick();
                }} />

            </div>
        </div>
    )
}

export default slate
