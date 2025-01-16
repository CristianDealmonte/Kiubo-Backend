// Importacion de dependencias
import express from 'express';


// Importacion de custom modules
import Authenticate from '../middleware/authenticate.js';
import MulterUpload from '../middleware/multerUpload.js';
import {
    obtenerUltimosChats,
    editarUsuario,
} from '../controllers/UsuarioController.js';









const router = express.Router();

router.get('/', Authenticate, obtenerUltimosChats);

router.post('/upload/UploadImgProfile', MulterUpload.single('file'), Authenticate, editarUsuario);
router.post('/upload/UploadImgBanner', MulterUpload.single('file'), Authenticate, editarUsuario);




 
export default router;