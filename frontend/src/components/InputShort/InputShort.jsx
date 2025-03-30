import React from 'react'
import './InputShort.css'

const InputShort = ({name, value, onChange}) => {
	return (
		<div>
			<div className='input-group'>
			<input
				type='text'
				id='short'
				name={name}
				value={value}
				onChange={onChange}
				placeholder='/shortcut'
				required
			/>
		</div>
		</div>
	)
}

export default InputShort
