import React from 'react'
import './InputSearch.css'
import { BsSearch } from "react-icons/bs";

const InpuntSearch = ({name, value, onChange }) => {
	return (
		<div id='input-search'>
			<BsSearch className='search-icon'/>
			<input
				type='text'
				id='input'
				name={name}
				value={value}
				onChange={onChange}
				placeholder='Search Link'
			/>
		</div>
	)
}

export default InpuntSearch
