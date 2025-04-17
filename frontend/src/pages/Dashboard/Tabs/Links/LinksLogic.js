import { useState } from 'react'
import callToBackend from '../../../../config/config.js'

export const useLinksLogic = (feedToast, userSession) => {
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
    console.log(linkToSearch)
  }

  const getCreateInputElement = (element) => {
    const { name, value } = element.target
    console.log(linkDataUser)
    setlinkDataUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const createButton = async () => {
    const { originalUrl, shortUrl, userId } = linkDataUser
    const updatedLinkData = {...linkDataUser, userId: userSession.userId}

    console.log(updatedLinkData)

    if (!originalUrl || !shortUrl) {
      feedToast('both')
      return
    }else{
			feedToast('success')
			return
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
