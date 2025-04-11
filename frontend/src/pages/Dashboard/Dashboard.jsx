import React from 'react'
import './Dashboard.css'
import Button from '../../components/Button/Button.jsx'
import { FaLink } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

const Dashboard = () => {
	return (
		<div id='dashboard'>
			<div className='nav-links'>
				<Button className="windows" Icon={FaLink}>
					Links
				</Button>
				<Button className="windows" Icon={IoMdSettings}>
					Settings
				</Button>
			</div>
			<div className='links-container'>
				aqui va cada link
			</div>
		</div>
	)
}

export default Dashboard
