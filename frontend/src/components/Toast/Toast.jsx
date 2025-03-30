import React from 'react'
import './Toast.css'

const Toast = ({icon, message, classIcon, confirmAdvice}) => {
	if (!confirmAdvice) return null

	return (
		<div id='toast'>
			<div className={`toast-icon ${classIcon}`}>{icon}</div>
			<div className='toast-message'>{message}</div>
		</div>
	)
}

export default Toast
