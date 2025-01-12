// Importacion de dependencias
import express from 'express';


// Importacion de custom modules
import Authenticate from '../middleware/authenticate.js';
import {
    obtenerUltimosChats
} from '../controllers/UsuarioController.js';



const router = express.Router();

router.get('/', Authenticate, obtenerUltimosChats);


export default router;