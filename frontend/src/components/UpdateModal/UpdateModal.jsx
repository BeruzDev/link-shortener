import React from 'react'
import './UpdateModal.css'
import Button from '../Button/Button.jsx'
import InputLink from '../InputLink/InputLink.jsx'
import InputShort from '../InputShort/InputShort.jsx'
import { IoIosClose } from 'react-icons/io'
import { LuSave } from "react-icons/lu";

const UpdateModal = ({
  isVisible,
	onCloseUpdateModal,
	id,
	originalUrl,
	shortUrl
}) => {
  return (
    <div id="update-modal" className={isVisible ? 'visible' : 'hidden'}>
      <div className="dialog">
        <div className="header">
          <p className="header-tittle">Edit link</p>
          <div className="button-cont">
            <Button
              className={'close'}
              Icon={IoIosClose}
              onClick={onCloseUpdateModal}
            />
          </div>
        </div>
        <div className="input-section">
          <div className="pair-elements">
            <label className="labels">Destination URL:</label>
            <InputLink
              className={'inputs'}
              name="originalUrl"
              value={originalUrl}
							readOnly
              // onChange={}
            />
          </div>
          <div className="pair-elements">
            <label className="labels">Short link:</label>
            <InputShort
              className={'inputs'}
              name="shortUrl"
              value={shortUrl}
              // onChange={}
            />
          </div>
        </div>
        <div className="buttons-section">
          <Button 
						className="cancel" 
						onClick={onCloseUpdateModal}
					>
            Cancel
          </Button>
          <Button
            className="create-shortLink"
            Icon={LuSave}
            //onClick={}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UpdateModal
