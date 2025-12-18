import React from 'react'
import './btn.css'

const Btn = ({ header, variant = "primary", onClick }) => {
  return (
    <div className={`but but-${variant}`} onClick={onClick}>
      {header}
    </div>
  );
};

export default Btn;

