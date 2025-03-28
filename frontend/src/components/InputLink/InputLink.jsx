import React from 'react'
import './InputLink.css'

const InputLink = () => {
	return (
		<div className='input-group'>
			<input
				type='url'
				id='link'
				// value={value}
				// onChange={onChange}
				placeholder='Enter your link'
				required
			/>
		</div>
	)
}

export default InputLink
