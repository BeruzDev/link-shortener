import supabase from '../config/db.js'

// Crear un nuevo usuario
const createUser = async (email, password) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password}])
    .select()

  if (error) {
    throw new Error('Error creating user: ' + error.message)
  }

  return data && data[0] ? data[0].id : null
}

// Recuperar usuario por email
const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)

  if (error) {
    throw new Error('Error fetching user: ' + error.message)
  }

  if (!data || data.length === 0) {
    return null
  }

  return data[0] 
}

export { createUser, getUserByEmail }
