import {
  createLink,
  getLinksByUserId,
  updateLink,
  deleteLink,
} from '../models/Link.js'

// Crear un enlace
const createLinkController = async (req, res) => {
  const { originalUrl, shortUrl } = req.body
  const userId = req.user.id // <-- id recuperado del middleware de autenticacion

  try {
    const newLink = await createLink(originalUrl, shortUrl, userId)
		res.status(201).json(newLink)
  } catch (error) {
    res.status(500).json({ message: 'Error creating link: ' + error.message })
  }
}

// Recuperar enlaces de un usuario
const getLinksByUserIdController = async (req, res) => {
	const userId = req.user.id

	try {
		const links = await getLinksByUserId(userId)
		res.status(200).json(links)
	} catch (error) {
		res.status(500).json({message: 'Error fetching links: ' + error.message})
	}
}

// Editar un enlace
const updateLinkController = async (req, res) => {
	const {linkId} = req.params
	const {newShortUrl} = req.body

	try {
		const updatedLink = await updateLink(linkId, newShortUrl)
		res.status(200).json(updatedLink)
	} catch (error) {
		res.status(500).json({message: 'Error updating link: ' + error.message})
	}
}

// Eliminar un enlace
const deleteLinkController = async (req, res) => {
	const {linkId} = req.params

	try {
		await deleteLink(linkId)
		res.status(200).json({message: 'Link deleted successfully'})
	} catch (error) {
		res.status(500).json({message: 'Error deleting link: ' + error.message})
	}
}

export {
	createLinkController,
	getLinksByUserIdController,
	updateLinkController,
	deleteLinkController,
}