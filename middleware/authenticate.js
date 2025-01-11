// Importaciones de dependencias
import JWT from 'jsonwebtoken';


// Importaciones de custom modules
import Usuario from '../models/Usuario.js';


const Authenticate = async (req, res, next) => {
    
    let token;

    if(
        req.headers.authorization && // Comprobamos que exista el JWT en las cabeceras 
        req.headers.authorization.startsWith('Bearer') // Comprueba que comience con lapalabra Bearer
    ) {
        
        try {
            // Separa el JWT de la palabra Bearer
            token = req.headers.authorization.split(' ')[1];

            // decodifica el JWT
            const decoded = JWT.verify(token, process.env.JWT_SECRET);

            // busca en la DB el usuario correspondiente al id del JWT y lo añade a express como variable
            req.usuario = await Usuario.findById(decoded.id).select('-password -token -confirmado');

            // Finaliza
            return next();  
            
        } catch (err) {
            const error = new Error('Token no valido');
            res.status(403).json({msg: error.message}); 
        }
    }

    // si no llego o no existe el JWT cae en error
    if(!token) {
        const error = new Error('Token no valido o inexistente');
        res.status(403).json({msg: error.message});         
    }

    next();
};

export default Authenticate;