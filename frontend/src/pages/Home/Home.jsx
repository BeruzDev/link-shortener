import React, { useState } from 'react'
import './Home.css'
import InputLink from '../../components/InputLink/InputLink.jsx'
import InputShort from '../../components/InputShort/InputShort.jsx'
import Button from '../../components/Button/Button.jsx'
import { TiArrowRightOutline } from 'react-icons/ti'
import callToBackend from '../../config/config.js'


const Home = () => {
  const [linkData, setLinkData] = useState({ originalUrl: '', shortUrl: '' })
  const [confirmAdvice, setConfirmAdvice] = useState(false)

  const getInputElement = (element) => {
    setLinkData({
      ...linkData,
      [element.target.name]: element.target.value,
    })
  }

  const craftButton = async () => {
    const { originalUrl, shortUrl } = linkData

    console.log(linkData)
		if(!originalUrl || !shortUrl){
			alert('Both fields are required!')
			return
		}
		
		try {
			const response = await fetch(`${callToBackend}/links/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({originalUrl: originalUrl, shortUrl: shortUrl})
			})

			if (response.ok){
				const result = await response.json()
				console.log('Link created successfully', result)

				setConfirmAdvice(true)
				setTimeout(() => {
					setConfirmAdvice(falSe)
				}, 3000);
			}else{
				console.error('Create link gone wrong')
			}

		} catch (error) {
			console.error('Error backend connection', error)
		}
  }

  return (
    <div id="home">
      <h1 id="title">Link Craft</h1>
      <p id="subtitle">
        Manage your endpoints and share your links easily, clearly, and
        securely.
      </p>
      <div id="crafter">
        <InputLink
          name="originalUrl"
          value={linkData.originalUrl}
          onChange={getInputElement}
        />
        <Button
          className="crafter-button"
          Icon={TiArrowRightOutline}
          onClick={craftButton}
        />
        <InputShort
          name="shortUrl"
          value={linkData.shortUrl}
          onChange={getInputElement}
        />
      </div>
      <footer id="footer">
        <p>BeruzDev</p>
      </footer>
    </div>
  )
}

export default Home
