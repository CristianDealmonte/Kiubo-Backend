// Importacion de dependencias



// Importacion de custom modules
import Usuario from "../models/Usuario.js";

 
const obtenerUltimosChats = async (req, res, next) => {

    try {
        // Extraemos el id del usuario del la req que nos retorna la autenticacion
        const usuario = req.usuario._id;
        
        // Extrae de la DB todos los usuarios excepto el que concuerde con el id del usuario
        const allUsers = await Usuario.find({_id: { $ne: usuario}}).select('-password -token -confirmado');
          
        return res.status(200).json(allUsers);
    } catch (error) {
        console.log(error)
    }
};


export {
    obtenerUltimosChats
}