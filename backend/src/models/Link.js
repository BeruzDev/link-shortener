import supabase from '../config/db'

// Crear un enlace
const createLink = async (originalUrl, shortUrl, userId = null) => {
  const { data, error } = await supabase
    .from('links')
    .insert([
      { original_url: originalUrl, short_url: shortUrl, user_id: userId },
    ])

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
	const {data, error} = await supabase
		.from('links')
		.update({short_url: newShortUrl})
		.eq('id', linkId)

	if (error){
		throw new Error('Error updating link: ' + error.message)
	}

	return data
}

// Eliminar un enlace
const deleteLink = async (linkId) => {
	const {data, error} = await supabase
		.from('links')
		.delete()
		.eq('id', linkId)

	if (error){
		throw new Error('Error deleting link: ' + error.message)
	}

	return data
}

export { createLink, getLinksByUserId, updateLink, deleteLink }
