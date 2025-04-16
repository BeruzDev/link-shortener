import React from 'react'
import './Links.css'
import { useLinksLogic } from './LinksLogic.js'
import InpuntSearch from '../../../../components/InputSearch/InpuntSearch.jsx'
import Button from '../../../../components/Button/Button.jsx'
import { FaPlus } from 'react-icons/fa6'

const Links = ({ onOpenCrafterModal, feedToast }) => {
  const {
    linkDataUser,
    linkToSearch,
    getInputElement,
    createLinkButton,
  } = useLinksLogic(feedToast)

  return (
    <div id="links-window">
      <div className="buttons-section">
        <InpuntSearch
          name="findShortUrl"
          value={linkToSearch.findShortUrl}
          onChange={getInputElement}
        />
        <Button
          className="create-link"
          Icon={FaPlus}
          onClick={onOpenCrafterModal}
        >
          Create Link
        </Button>
      </div>
      <div className="bento-section"></div>
    </div>
  )
}

export default Links
