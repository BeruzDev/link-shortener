import express from 'express'
import {
  createLinkController,
  getLinksByUserIdController,
  updateLinkController,
  deleteLinkController,
} from '../controllers/linkController.js'
import { verifySupabaseToken } from '../middlewares/authSupabaseToken.js'

const router = express.Router()

// Crear link
router.post('/', createLinkController)

// Obtener links del user (requiere auth)
router.get('/my-links', verifySupabaseToken, getLinksByUserIdController)

// Actualizar link (requiere auth)
router.put('/:linkId', verifySupabaseToken, updateLinkController)

// Eliminar link (requiere auth)
router.delete('/:linkId', verifySupabaseToken, deleteLinkController)

export default router