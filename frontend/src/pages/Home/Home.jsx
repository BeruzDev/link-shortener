import React from 'react'
import './Home.css'
import InputLink from '../../components/InputLink/InputLink.jsx'
import InputShort from '../../components/InputShort/InputShort.jsx'
import Button from '../../components/Button/Button.jsx'
import { TiArrowRightOutline } from "react-icons/ti";


const Home = () => {
	const craftButton = () => {
		console.log('enviar al backend')
	}

	return (
		<div id='home'>
			<h1 id='title'>Link Craft</h1>
			<p id='subtitle'>Manage your endpoints and share your links easily, clearly, and securely.</p>
			<div id='crafter'>
				<InputLink/> 
				
				<Button
					Icon={TiArrowRightOutline}
					onClick={craftButton}
				/>

				<InputShort/>	
			</div>
		</div>
	)
}

export default Home
