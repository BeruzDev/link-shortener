import React from 'react'
import './Dashboard.css'
import { useDashboard } from './DashboardLogic.js'
import Button from '../../components/Button/Button.jsx'
import { FaLink } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";


const Dashboard = ({feedToast}) => {
	const {activeTab, setActiveTab, tabs} = useDashboard()
	const TabComponent = tabs[activeTab]

	return (
		<div id='dashboard'>
			<div className='nav-links'>
				<Button 
					className={`windows ${activeTab === 'links' ? 'active-button' : ''}`} 
					Icon={FaLink} 
					onClick={() => setActiveTab('links')}
				>
					Links
				</Button>
				<Button 
					className={`windows ${activeTab === 'settings' ? 'active-button' : ''}`} 
					Icon={IoMdSettings} 
					onClick={() => setActiveTab('settings')}
				>
					Settings
				</Button>
			</div>
			<div id='windows-container'>
				<TabComponent feedToast={feedToast}/>
			</div>
		</div>
	)
}

export default Dashboard
