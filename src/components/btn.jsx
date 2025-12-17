import React from 'react'
import './btn.css'

const Btn = ({ header, variant = "primary" }) => {
  return (
    <div className={`but but-${variant}`}>
      {header}
    </div>
  );
};

export default Btn;

