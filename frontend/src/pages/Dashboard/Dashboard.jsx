import React, { useEffect } from 'react'
import './Dashboard.css'
import { useDashboard } from './DashboardLogic.js'
import Button from '../../components/Button/Button.jsx'
import { FaLink } from 'react-icons/fa6'
import { IoMdSettings } from 'react-icons/io'

const Dashboard = ({ feedToast, userSession }) => {
  const {
    isCrafterModalOpen,
    onOpenCrafterModal,
    onCloseCrafterModal,
    activeTab,
    setActiveTab,
    tabs,
    getUserLinks,
    linkStored,
  } = useDashboard(userSession)

  const TabComponent = tabs[activeTab]
  
  useEffect(() => {
    if (activeTab === 'links') {
      getUserLinks()
    }
  }, [activeTab, getUserLinks])

  return (
    <div className={`dashboard ${isCrafterModalOpen ? 'is-modal-open' : ''}`}>
      <div className="nav-links">
        <Button
          className={`windows ${activeTab === 'links' ? 'active-button' : ''}`}
          Icon={FaLink}
          onClick={() => setActiveTab('links')}
        >
          Links
        </Button>
        <Button
          className={`windows ${
            activeTab === 'settings' ? 'active-button' : ''
          }`}
          Icon={IoMdSettings}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </Button>
      </div>
      <div id="windows-container">
        <TabComponent
          isCrafterModalOpen={isCrafterModalOpen}
          onOpenCrafterModal={onOpenCrafterModal}
          onCloseCrafterModal={onCloseCrafterModal}
          userSession={userSession}
          linkStored={linkStored}
          getUserLinks={getUserLinks}
          feedToast={feedToast}
        />
      </div>
    </div>
  )
}

export default Dashboard
