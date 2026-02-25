import React from 'react'   
import './sidesearch.css'

const sidesearch = (prop) => {
  return (
    <div className={`sidesearch ${prop.ison ? 'open' : ''}`}>
      <div className="header">See people's work</div>
    </div>
  )
}

export default sidesearch
