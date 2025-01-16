// Importacion de dependencias
import dotenv from 'dotenv';

// Importacion de custom modules
import Usuario from "../models/Usuario.js";
import multer from 'multer';


 
const obtenerUltimosChats = async (req, res, next) => {

    try {
        // Extraemos el id del usuario del la req que nos retorna la autenticacion
        const usuario = req.usuario._id;
        
        // Extrae de la DB todos los usuarios excepto el que concuerde con el id del usuario
        const allUsers = await Usuario.find({_id: { $ne: usuario}}).select('-password -token -confirmado -__v');
          
        return res.status(200).json(allUsers);
    } catch (error) {
        console.log(error)
    }
};


// Controlador para manejar la subida de imágenes
const editarUsuario = async (req, res) => {

    // Extrae el usuario de la DB
    const usuario = await Usuario.findById(req.usuario._id).select('-password -token -confirmado -email -createdAt -updatedAt -__v');

    // Verifica que se haya subido una imagen
    if (!req.file) {
        return res.status(400).send({ error: 'No se ha subido ninguna imagen.' });
    }


    // Realiza cambios
    // usuario.descripcion = req.body.descripcion || usuario.descripcion;
    // usuario.profilePicture = req.file.filename || usuario.profilePicture;
    usuario.bannerImg = req.file.filename || usuario.bannerImg;

    // Guarda cambios en DB
    await usuario.save(); 

    res.json({ 
        data: 'Imagen cargada correctamente', 
        file: req.file,
        usuario: usuario
    });
};




export {
    obtenerUltimosChats,
    editarUsuario
}