import supabase from '../config/db.js'
import bcrypt from 'bcryptjs'

// Crear un nuevo usuario
const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password: hashedPassword }])
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
    .eq('email', email) //<-- buscar igualdad supabase
    .single() // <-- Solo busca un unico usuario

  if (error) {
    throw new Error('Error fetching user: ' + error.message)
  }

  return data
}

export { createUser, getUserByEmail }
