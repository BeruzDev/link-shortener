import express from 'express'
import {
  createLinkController,
  getLinksByUserIdController,
  getLinksToExportController,
  searchLinkController,
  updateLinkController,
  deleteLinkController,
} from '../controllers/linkController.js'
import { verifySupabaseToken } from '../middlewares/authSupabaseToken.js'

const router = express.Router()

// Crear link
router.post('/', createLinkController)

// Obtener links del user 
router.get('/my-links', verifySupabaseToken, getLinksByUserIdController)

// Obtener links para exportar
router.get('/export-links', verifySupabaseToken, getLinksToExportController)

// Buscar un link
router.get('/search-link', verifySupabaseToken, searchLinkController)

// Actualizar link (requiere auth)
router.put('/:linkId', verifySupabaseToken, updateLinkController)

// Eliminar link (requiere auth)
router.delete('/:linkId', verifySupabaseToken, deleteLinkController)

export default router