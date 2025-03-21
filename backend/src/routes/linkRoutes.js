import express from 'express'
import {
  createLinkController,
  getLinksByUserIdController,
  updateLinkController,
  deleteLinkController,
} from '../controllers/linkController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Crear link
router.post('/create', createLinkController)

// Obtener links del user (requiere auth)
router.get('/my-links', authenticateToken, getLinksByUserIdController)

// Actualizar link (requiere auth)
router.put('/update/:linkId', authenticateToken, updateLinkController)

// Eliminar link (requiere auth)
router.delete('/delete/:linkId', authenticateToken, deleteLinkController)

export default router