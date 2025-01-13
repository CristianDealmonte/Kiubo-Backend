// Importacion de dependencias
import express from 'express';


// Importacion de custom modules
import Authenticate from '../middleware/authenticate.js';
import {
    obtenerMensajes,
    enviarMensaje,
} from '../controllers/MensajeController.js'


// crea asociacion para enrutar
const router = express.Router();


router.get('/:id', Authenticate, obtenerMensajes);
router.post('/send/:id', Authenticate, enviarMensaje);

export default router;