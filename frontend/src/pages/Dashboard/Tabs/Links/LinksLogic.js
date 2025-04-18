import { useState } from 'react'
import callToBackend from '../../../../config/config.js'

export const useLinksLogic = (
  feedToast,
  userSession,
  onCloseCrafterModal,
  getUserLinks,
  linkStored,
  setisAnyModalOpen,
) => {
  const [linkDataUser, setlinkDataUser] = useState({
    originalUrl: '',
    shortUrl: '',
    userId: '',
  })
  const [linkToSearch, setLinkToSearch] = useState({ findShortUrl: '' })
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [linkDataUpdate, setLinkDataUpdate] = useState({
    linkId: '',
    originalUrl: '',
    shortUrl: '',
  })

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
    const updatedLinkData = { ...linkDataUser, userId: userSession.userId }

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
        body: JSON.stringify(updatedLinkData),
      })

      if (response.ok) {
        const result = await response.json()
        feedToast('created')
        setlinkDataUser({ originalUrl: '', shortUrl: '' })
        onCloseCrafterModal()
      } else {
        const errorResponse = await response.json()
        if (
          response.status === 409 &&
          errorResponse.code === 'DUPLICATE_SHORTURL'
        ) {
          feedToast('duplicate')
        } else {
          feedToast('error')
        }
      }
    } catch (error) {
      console.error('Error while crafting a link:', error)
      feedToast('error')
    }
  }

  const handleCopy = (shortUrl) => {
    const domain = 'http://localhost:5000' //!! window.location.origin <- ponerlo cuando compre dominio!
    const fullUrl = `${domain}/${shortUrl}`

    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        console.log('link copyed!', fullUrl)
        feedToast('copy')
      })
      .catch((err) => {
        console.error('Error to copy:', err)
        feedToast('error')
      })
  }

  const handleDelete = async (id) => {
    const { accessToken } = userSession

    if (!id) {
      feedToast('error')
      return
    }

    try {
      const response = await fetch(`${callToBackend}/links/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) throw new Error("Can't delete the link")

      const data = await response.json()
      console.log('Link deleted:', data)

      feedToast('delete')

      setTimeout(() => {
        getUserLinks()
      }, 500)
    } catch (error) {
      console.error('Error while deleteing a link:', error)
      feedToast('error')
    }
  }

  const onOpenUpdateModal = (id) => {
    const selectedLink = linkStored.find((link) => link.id === id)
    if (selectedLink) {
      setLinkDataUpdate({
        linkId: selectedLink.id,
        originalUrl: selectedLink.originalUrl,
        shortUrl: selectedLink.shortUrl,
        userId: selectedLink.userId,
      })
      setIsUpdateModalOpen(true)
      setisAnyModalOpen(true)
    }
  }

  const onCloseUpdateModal = () => {
    setIsUpdateModalOpen(false)
    setisAnyModalOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLinkDataUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleUpdateLink = async () => {
    const { linkId, shortUrl } = linkDataUpdate
    const { accessToken } = userSession

    if (!linkId){
      console.error('Link ID is undefined');
      feedToast('error')
      return
    }

    if (!shortUrl) {
      feedToast('both')
      return
    }

    try {
      const response = await fetch(`${callToBackend}/links/${linkId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ newShortUrl: shortUrl }),
      })

      if (!response.ok) throw new Error("Can't update the link")
      const data = await response.json()
      console.log('link updated: ', data)

      feedToast('update')
      getUserLinks()
      onCloseUpdateModal()
    } catch (error) {
      console.error('Error while updating the link: ', error)
      feetToast('error')
    }
  }

  return {
    linkDataUser,
    linkToSearch,
    getSearchInputElement,
    getCreateInputElement,
    createButton,
    handleCopy,
    handleDelete,
    isUpdateModalOpen,
    onOpenUpdateModal,
    onCloseUpdateModal,
    linkDataUpdate,
    handleInputChange,
    handleUpdateLink,
  }
}
