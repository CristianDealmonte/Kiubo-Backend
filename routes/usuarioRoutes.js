// Importacion de dependencias
import express from 'express';



// Importacion de custom modules
import {
    registrar,
    confirmar,
    autenticar,
    comprobarToken,
    cambiarPassword,
    nuevoPassword
} from '../controllers/UsuarioController.js'



// crea asociacion para enrutar
const router = express.Router();

// Rutas de dominio publico
router.post('/', registrar);
router.get('/confirm/:token', confirmar);
router.post('/login', autenticar);
router.post('/reset-password', cambiarPassword)
router.route('/reset-password/:token')
    .get(comprobarToken)
    .post(nuevoPassword);


// Rutas de dominio privado


export default router;