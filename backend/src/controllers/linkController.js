import {
  createLink,
  getLinksByUserId,
  updateLink,
  deleteLink,
} from '../models/Link.js'
import { v4 as uuidv4 } from 'uuid'

// Crear un enlace
const createLinkController = async (req, res) => {
  const { originalUrl, shortUrl } = req.body
  const userId = req.user ? req.user.id : null // <-- id recuperado del middleware de autenticacion

  const generatedShortUrl = shortUrl || `shorted.link/${uuidv4().slice(0, 8)}` // <-- si no se proporciona shortUrl(no esta registrado el usuario) -> generar un shortUrl por defecto

  try {
    // Hacemos la inserción
    const data = await createLink(originalUrl, generatedShortUrl, userId)

    // Si no hay datos
    if (!data || data.length === 0) {
      return res.status(400).json({
        message: 'Error creating link: No data returned from database',
      })
    }

    // Devolvemos el short_url
    res.status(201).json({
      message: 'Link created successfully',
      link: data[0].short_url,
    })
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
    res.status(500).json({ message: 'Error fetching links: ' + error.message })
  }
}

// Editar un enlace
const updateLinkController = async (req, res) => {
  const { linkId } = req.params
  const { newShortUrl } = req.body

  // Formato del short.link/
  const shortUrlPattern = /^[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-]+\/[a-zA-Z0-9\-]+$/ //${string}.${string}/${string}

  if (!shortUrlPattern.test(newShortUrl)) {
    return res.status(400).json({
      message:
        'Invalid short URL format. It must follow: domain.subdomain/string',
    })
  }

  try {
    const updatedLink = await updateLink(linkId, newShortUrl)
    res.status(200).json(updatedLink)
  } catch (error) {
    res.status(500).json({ message: 'Error updating link: ' + error.message })
  }
}

// Eliminar un enlace
const deleteLinkController = async (req, res) => {
  const { linkId } = req.params

  try {
    await deleteLink(linkId)
    res.status(200).json({ message: 'Link deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting link: ' + error.message })
  }
}

export {
  createLinkController,
  getLinksByUserIdController,
  updateLinkController,
  deleteLinkController,
}
