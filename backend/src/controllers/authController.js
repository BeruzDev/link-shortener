import { createUser, getUserByEmail } from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { email, password } = req.body

  // Verificar que el email no exista
  const existingUser = await gerUserByEmail(email)
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' })
  }

  try {
    // Crear el usuario
    const user = await createUser(email, password)
    res.status(201).json({ message: 'User created', user })
  } catch (error) {
    res.status(500).json({ error: 'Server error ' + error.message })
  }
}

// Iniciar sesion
const loginUser = async (req, res) => {
	const { email, password} = req.body

	try {
		// Buscar el usuario por email
		const user = await getUserByEmail(email)
		if (!user){
			return res.status(404).json({ error: 'User not found' })
		}

		// Verificar la contraseña
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid){
			return res.status(401).json({ error: 'Invalid password' })
		}

		// Generar Json Web Token para usuario autenticado
		const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, { expiresIn: '1h' })

		// Enviar el token al cliente
		res.status(200).json({message: 'Login successful',  token })

	} catch (error) {
		res.status(500).json({ error: 'Error login ' + error.message })
	}
}


export { registerUser, loginUser }