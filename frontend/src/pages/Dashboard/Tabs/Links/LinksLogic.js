import { useState } from "react"
import callToBackend from '../../../../config/config.js'

export const useLinksLogic = (feedToast) => {
	const [linkDataUser, setlinkDataUser] = useState({ originalUrl: '', shortUrl: '', userId: ''});
	const [linkToSearch, setLinkToSearch] = useState({ findShortUrl: ''});

	const getInputElement = (element) => {
    const { name, value } = element.target
    setLinkToSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

	const onOpenCrafterModal = () => {
		console.log('openModal!!')
	}

	const createLinkButton = async () => {
		const {originalUrl, shortUrl, userId} = linkDataUser

		if (!originalUrl || !shortUrl || !userId){
			feedToast('both')
			return
		}
	}

	return {
		linkDataUser,
		linkToSearch,
		getInputElement,
		onOpenCrafterModal,
		createLinkButton,
	}
}