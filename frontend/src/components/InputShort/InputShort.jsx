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
				placeholder='Enter your shortcut'
				required
			/>
		</div>
		</div>
	)
}

export default InputShort
