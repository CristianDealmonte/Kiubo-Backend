// Importacion de dependencias
import express from 'express';


// Importacion de custom modules
import Authenticate from '../middleware/authenticate.js';
import MulterUpload from '../middleware/multerUpload.js';
import {
    obtenerUltimosChats,
    actualizarFotoPerfil,
    uploadImage,
    uploadMiddleware,
} from '../controllers/UsuarioController.js';









const router = express.Router();

router.get('/', Authenticate, obtenerUltimosChats);
router.post('/upload/imgProfile', MulterUpload.single('file'), actualizarFotoPerfil);

router.post('/upload', uploadMiddleware, uploadImage);

 
export default router;