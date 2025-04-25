import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import callToBackend from '../../../../config/config.js'

export const useSettingsLogic = (userSession, feedToast) => {
  const [linksToExport, setlinksToExport] = useState({
    originalUrl: null,
    shortUrl: null,
  })

  const navigate = useNavigate()

  const exportUserLinks = async () => {
    const { accessToken } = userSession

    try {
      const response = await fetch(`${callToBackend}/links/export-links`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) throw new Error("Can't export links")

      const data = await response.json()

      const formattedLinks = data.map((link) => ({
        originalUrl: link.original_url,
        shortUrl: link.short_url,
      }))

      setlinksToExport(formattedLinks)
    } catch (error) {
      console.error('Error exporting links from user: ', error)
    }
  }

  const downloadLinksAsJson = async () => {
    await exportUserLinks()

    if (!linksToExport || linksToExport.length === 0) {
      feedToast('no-links')
      return
    }

    const jsonData = JSON.stringify(linksToExport, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'my_craft_links.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const deleteUserAccount = async () => {
    const { accessToken } = userSession

    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(`${callToBackend}/links/delete-user`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })


      if (!response.ok) throw new Error("Can't delete user")

      const data = await response.json()

      feedToast('bye')
      navigate('/')
    } catch (error) {
      console.error('Error deleting user account:', error)
      feedToast('error')
    }
  }

  return {
    linksToExport,
    exportUserLinks,
    deleteUserAccount,
    downloadLinksAsJson,
  }
}
