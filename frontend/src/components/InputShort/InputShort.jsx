import React from 'react'
import './InputShort.css'

const InputShort = () => {
	return (
		<div>
			<div className='input-group'>
			<input
				type='text'
				id='short'
				// value={value}
				// onChange={onChange}
				placeholder='/shortcut'
				required
			/>
		</div>
		</div>
	)
}

export default InputShort
