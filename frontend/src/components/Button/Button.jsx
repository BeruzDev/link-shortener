import React from 'react'
import './Button.css'

const button = ({ Icon, onClick }) => {
  return (
    <button type="button" onClick={onClick} className="button">
      {Icon && <Icon className="icon"></Icon>}
    </button>
  )
}

export default button
