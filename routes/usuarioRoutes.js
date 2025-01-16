// Importacion de dependencias
import express from 'express';


// Importacion de custom modules
import Authenticate from '../middleware/authenticate.js';
import MulterUpload from '../middleware/multerUpload.js';
import {
    obtenerUltimosChats,
    actualizarFotoPerfil
} from '../controllers/UsuarioController.js';



const router = express.Router();

router.get('/', Authenticate, obtenerUltimosChats);
router.post('/upload/imgProfile', MulterUpload.single('file'), actualizarFotoPerfil);


export default router;