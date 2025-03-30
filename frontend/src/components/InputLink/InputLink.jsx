import React from 'react'
import './InputLink.css'

const InputLink = ({name, value, onChange }) => {
	return (
		<div className='input-group'>
			<input
				type='url'
				id='link'
				name={name}
				value={value}
				onChange={onChange}
				placeholder='your.link'
				required
			/>
		</div>
	)
}

export default InputLink
