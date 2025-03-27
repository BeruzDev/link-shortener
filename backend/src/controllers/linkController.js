import supabase from '../config/db.js'
import {
  createLink,
  getLinksByUserId,
  updateLink,
  deleteLink,
  redirectLink,
} from '../models/Link.js'
import { v4 as uuidv4 } from 'uuid'

// Crear un enlace
const createLinkController = async (req, res) => {
  const { originalUrl, shortUrl, userId } = req.body

  const finalUserId = userId || null

  const generatedShortUrl = shortUrl || uuidv4().slice(0, 8) // <-- si no se proporciona shortUrl(no esta registrado el usuario) -> generar un shortUrl por defecto

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
      userId: finalUserId,
    })
  } catch (error) {
    res.status(500).json({ message: 'Error creating link: ' + error.message })
  }
}

// Recuperar enlaces de un usuario
const getLinksByUserIdController = async (req, res) => {
  const userId = req.userId

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
  const authenticatedUserId = req.userId

  // Formato del shortlink
  const shortUrlPattern = /^[a-zA-Z0-9\-]+$/

  if (!shortUrlPattern.test(newShortUrl)) {
    return res.status(400).json({
      message:
        'Invalid short URL format. It should only contain alphanumeric characters and hyphens.',
    })
  }

  try {
    const {data, error} = await supabase
      .from('links')
      .select('user_id')
      .eq('id', linkId)
      .single()

      if (error || !data) {
        return res.status(404).json({ message: 'Link not found' })
      }

      if(data.user_id !== authenticatedUserId){
        return res.status(403).json({
          message: "You don't have permission to edit this link."
        })
      }

    const updatedLink = await updateLink(linkId, newShortUrl)
    res
      .status(200)
      .json({
        original_url: updatedLink.original_url,
        short_url: updatedLink.short_url,
      })
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

// Redireccion de shortUrl a originalUrl
const redirectLinkController = async (req, res) => {
  const { shortUrl } = req.params

  try {
    const originalUrl = await redirectLink(shortUrl)

    if (!originalUrl) {
      res.status(404).send('Redirection not found') //!!<- Aqui ira la pagina HTML de error!!
    }

    res.redirect(originalUrl)
  } catch (error) {
    res.status(500).send('Server error: ' + error.message)
  }
}

export {
  createLinkController,
  getLinksByUserIdController,
  updateLinkController,
  deleteLinkController,
  redirectLinkController,
}
