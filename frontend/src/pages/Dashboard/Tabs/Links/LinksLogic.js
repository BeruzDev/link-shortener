import { useState } from 'react'
import callToBackend from '../../../../config/config.js'

export const useLinksLogic = (feedToast, userSession, onCloseCrafterModal) => {
  const [linkDataUser, setlinkDataUser] = useState({
    originalUrl: '',
    shortUrl: '',
    userId: '',
  })
  const [linkToSearch, setLinkToSearch] = useState({ findShortUrl: '' })

  const getSearchInputElement = (element) => {
    const { name, value } = element.target
    setLinkToSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const getCreateInputElement = (element) => {
    const { name, value } = element.target
    setlinkDataUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const createButton = async () => {
    const { originalUrl, shortUrl } = linkDataUser
    const updatedLinkData = {...linkDataUser, userId: userSession.userId}

    if (!originalUrl || !shortUrl) {
      feedToast('both')
      return
    }


    try {
      const response = await fetch(`${callToBackend}/links/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(updatedLinkData)
      })

      if (response.ok){
        const result = await response.json()
        feedToast('created')
        setlinkDataUser({originalUrl: '', shortUrl: '',})
        
        setTimeout(() => {
          onCloseCrafterModal()
        }, 1000);
      }else{
        const errorResponse = await response.json()
        if (response.status === 409 && errorResponse.code === 'DUPLICATE_SHORTURL') {
          feedToast('duplicate')
        }else{
          feedToast('error')
        }
      }
    } catch (error) {
      console.error('Error al crear el enlace:', error)
      feedToast('error')
    }
  }

  return {
    linkDataUser,
    linkToSearch,
    getSearchInputElement,
    getCreateInputElement,
    createButton,
  }
}
