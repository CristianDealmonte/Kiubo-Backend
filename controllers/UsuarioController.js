// Importacion de dependencias


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




// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './media'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop(); // Obtener extensión del archivo
        cb(null, `${Date.now()}.${ext}`); // Generar nombre único
    }
});

// Instancia de multer configurada
const upload = multer({ storage });

// Controlador para manejar la subida de imágenes
export const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No se ha subido ninguna imagen.' });
    }
    res.send({ data: 'Imagen cargada correctamente', file: req.file });
};

// Exportar multer para usarlo en la ruta
export const uploadMiddleware = upload.single('imagenPerfil');



export {
    obtenerUltimosChats,
}