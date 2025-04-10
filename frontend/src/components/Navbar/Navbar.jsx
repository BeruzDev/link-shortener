import React from 'react'
import './Navbar.css'
import Button from '../Button/Button.jsx'
import { BsGithub } from "react-icons/bs"
import { FaArrowRightLong } from "react-icons/fa6";

const Navbar = ({ onOpenModal }) => {
	return (
		<nav id='navbar'>
			<p id='logo'>Link Craft</p>
			<div className='btn-zone'>
			<Button className="navbar-button" Icon={BsGithub} onClick={() => window.open('https://github.com/BeruzDev/link-shortener',  '_blank', 'noopener,noreferrer')} />

			<Button className="get-started" Icon={FaArrowRightLong} onClick={onOpenModal}>
				Get Started
			</Button>
			</div>
		</nav>
	)
}

export default Navbar
