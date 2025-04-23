import { useState } from 'react'
import callToBackend from '../../../../config/config.js'

export const useSettingsLogic = (userSession) => {
  const [linksToExport, setlinksToExport] = useState({
    originalUrl: null,
    shortUrl: null,
  })
  console.log(linksToExport)

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

			console.log('front -> ', data)

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

		if(!linksToExport || linksToExport.length === 0){
			feedToast('no-links')
			return
		}
	
		const jsonData = JSON.stringify(linksToExport, null, 2);
		const blob = new Blob([jsonData], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'my_craft_links.json';
		link.click();
		URL.revokeObjectURL(url);
	}

  const deleteUserAccount = () => {
    console.log('eliminando user...')
  }

  return {
    linksToExport,
    exportUserLinks,
    deleteUserAccount,
		downloadLinksAsJson,
  }
}
