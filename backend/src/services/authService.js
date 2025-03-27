import { createUser, getUserByEmail } from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// Registrar un nuevo usuario
const authRegisterUser = async (email, password) => {
  try {
    // Verificar que el email no exista
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    // Hashear la password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear nuevo usuario
    const newUser = await createUser(email, hashedPassword)

    // Generar token para el nuevo usuario
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    return { message: 'User created successfully', token, userId: newUser.id }
  } catch (error) {
    throw new Error(`Error in registerUser: ${error.message}`)
  }
}

// Iniciar sesion
const authLoginUser = async (email, password) => {
  try {
    // Buscar usuario por email
    const user = await getUserByEmail(email)
    if (!user) {
      throw new Error('User not found')
    }

    // Verificar la password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }

    //Generar un token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    return { message: 'Login successful', token, userId: user.id }
  } catch (error) {
    throw new Error(`Error in loginUser: ${error.message}`)
  }
}

export { authRegisterUser, authLoginUser }
