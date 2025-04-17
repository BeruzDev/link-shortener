import React from 'react'
import './LinkElement.css'
import Button from '../Button/Button.jsx'
import { HiOutlineDuplicate } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin7Line } from "react-icons/ri";

const LinkElement = () => {
	return (
		<div id='link-element'>
			<div className='top-section'>
				<div className='short-url'>
					/ShortURL
				</div>
				<div className='buttons-section'>
				<Button
          className="copy-link"
          Icon={HiOutlineDuplicate}
          onClick={navigator.clipboard.writeText(`localhost:5173/`)} //!! <-- cambiar al dominio!}
        />
				<Button
          className="edit-link"
          Icon={TbEdit}
        />
				<Button
          className="delete-link"
          Icon={RiDeleteBin7Line}
        />
				</div>
			</div>
			<div className='bot-section'>
				
			</div>
		</div>
	)
}

export default LinkElement
