import { useState } from "react"
import Links from './Tabs/Links/Links.jsx'
import Settings from './Tabs/Settings/Settings.jsx'

export const useDashboard = () => {
  const [isCrafterModalOpen, setIsCrafterModalOpen] = useState(false);

	const onOpenCrafterModal = () => {
		setIsCrafterModalOpen(true)
    
	}

  const onCloseCrafterModal = () => {
    setIsCrafterModalOpen(false)
  }

  const [activeTab, setActiveTab] = useState('links')
  const tabs = {
    links: Links,
    settings: Settings,
  }

  return {
    isCrafterModalOpen,
    onOpenCrafterModal,
    onCloseCrafterModal,
    activeTab,
    setActiveTab,
    tabs,
  }
}


