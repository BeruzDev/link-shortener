import React from 'react'
import './CrafterModal.css'
import Button from '../Button/Button.jsx'
import InputLink from '../InputLink/InputLink.jsx'
import InputShort from '../InputShort/InputShort.jsx'
import { IoIosClose } from "react-icons/io"

const CrafterModal = ({ isVisible, onCloseCrafterModal, feedToast }) => {
  return (
    <div id="crafter-modal" className={isVisible ? 'visible' : 'hidden'}>
      <div className='dialog'>
				<div className='header'>
					<p className='header-tittle'>Create a link</p>
					<div className='button-cont'>
						<Button className={'close'} Icon={IoIosClose} onClick={onCloseCrafterModal}/>
					</div>
				</div>
				<div className='input-section'>
					<div className='pair-elements'>
						<label className='labels'>Destination URL:</label>
						<InputLink className={'inputs'}/>
					</div>
					<div className='pair-elements'>
						<label className='labels'>Short link:</label>
						<InputShort className={'inputs'}/>
					</div>
				</div>
			</div>
    </div>
  )
}

export default CrafterModal
