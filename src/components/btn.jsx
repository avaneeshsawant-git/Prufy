import React from 'react'
import './btn.css'

const Btn = ({ header, variant = "primary", onClick }) => {
  return (
    <button className={`but but-${variant}`} onClick={onClick}>
      {header}
    </button>
  );
};

export default Btn;

