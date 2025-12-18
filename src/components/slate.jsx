import React from 'react'
import Btn from './btn'
import './slate.css'

const slate = (prop) => {
    return (
        <div className='slate' >
            <div className="rightside">
                <h2 className="title">{prop.title}</h2>
                <div className="indicator">public</div>
            </div>
            <div className="leftside">
                <Btn header="Info" variant="primary" onClick={prop.onClick} />
                <Btn header="Logs" variant="secondary" className="but-disabled"/>
                <Btn header="Finish" variant="danger" className="but-disabled" />

            </div>
        </div>
    )
}

export default slate
