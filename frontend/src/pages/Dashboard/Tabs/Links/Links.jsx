import React from 'react'
import './Links.css'
import { useLinksLogic } from './LinksLogic.js'
import InpuntSearch from '../../../../components/InputSearch/InpuntSearch.jsx'
import Button from '../../../../components/Button/Button.jsx'
import CrafterModal from '../../../../components/CrafterModal/CrafterModal.jsx'
import LinkElement from '../../../../components/LinkElement/LinkElement.jsx'
import { FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Links = ({ isCrafterModalOpen, onOpenCrafterModal, onCloseCrafterModal, feedToast, userSession }) => {
  const {
    linkDataUser,
    linkToSearch,
    getSearchInputElement,
    getCreateInputElement,
    createButton,
  } = useLinksLogic(feedToast, userSession, onCloseCrafterModal)

  return (
    <div id="links-window">
      <div className="buttons-section">
        <InpuntSearch
          name="findShortUrl"
          value={linkToSearch.findShortUrl}
          onChange={getSearchInputElement}
        />
        <Button
          className="create-link"
          Icon={FaPlus}
          onClick={onOpenCrafterModal}
        >
          Create Link
        </Button>
      </div>
      <div className="bento-section">
        <LinkElement />
        <LinkElement />
        <LinkElement />
      </div>

      <CrafterModal 
        linkDataUser={linkDataUser} 
        isVisible={isCrafterModalOpen} 
        onCloseCrafterModal={onCloseCrafterModal} 
        createButton={createButton}
        getCreateInputElement={getCreateInputElement}
        userSession={userSession}
      />

    </div>
  )
}

export default Links
