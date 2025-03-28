import React from 'react'
import './Home.css'
import InputLink from '../../components/InputLink/InputLink.jsx'
import InputShort from '../../components/InputShort/InputShort.jsx'

const Home = () => {
	return (
		<div id='home'>
			<h1 id='title'>Link Craft</h1>
			<p id='subtitle'>Manage your endpoints and share your links easily, clearly, and securely.</p>
			<div id='crafter'>
				<InputLink/>  <InputShort/>	
			</div>
		</div>
	)
}

export default Home
