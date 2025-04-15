import { useState } from "react"
import Links from './Tabs/Links/Links.jsx'
import Settings from './Tabs/Settings/Settings.jsx'

export const useDashboard = () => {
  const [activeTab, setActiveTab] = useState('links')
  const tabs = {
    links: Links,
    settings: Settings,
  }

  return {
    activeTab,
    setActiveTab,
    tabs,
  }
}


