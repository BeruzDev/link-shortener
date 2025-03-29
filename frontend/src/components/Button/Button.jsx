import React from 'react'
import './Button.css'

const button = ({ Icon, onClick, className, children }) => {
  return (
    <button type="button" onClick={onClick} className={`button ${className}`}>
      {Icon && <Icon className="icon"/>}
      {children && <span className='button-text'>{children}</span>}
    </button>
  )
}

export default button
