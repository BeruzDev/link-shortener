import supabase from '../config/db.js'

// Crear un enlace
const createLink = async (originalUrl, shortUrl, userId) => {
  const { data, error } = await supabase
    .from('links')
    .insert([
      { original_url: originalUrl, short_url: shortUrl, user_id: userId },
    ])
    .select('id, short_url')

  if (error) {
    throw new Error('Error shortening link: ' + error.message)
  }

  return data
}

// Recuperar enlaces de un usuario
const getLinksByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    throw new Error('Error fetching links: ' + error.message)
  }

  return data
}

// Editar un enlace
const updateLink = async (linkId, newShortUrl) => {
  const { data, error } = await supabase
    .from('links')
    .update({ short_url: newShortUrl })
    .eq('id', linkId)
    .select()

  if (error) {
    throw new Error('Error updating link: ' + error.message)
  }

  return data ? data[0] : null
}

// Eliminar un enlace
const deleteLink = async (linkId) => {
  const { data, error } = await supabase.from('links').delete().eq('id', linkId)

  if (error) {
    throw new Error('Error deleting link: ' + error.message)
  }

  return data
}

// Redireccion de shortUrl a originalUrl
const redirectLink = async (shortUrl) => {
  const { data, error } = await supabase
    .from('links')
    .select('original_url')
    .eq('short_url', shortUrl)
    .single()

  if (error) {
    throw new Error('Error geting links: ' + error.message)
  }

  return data ? data.original_url : null
}

export { createLink, getLinksByUserId, updateLink, deleteLink, redirectLink }
