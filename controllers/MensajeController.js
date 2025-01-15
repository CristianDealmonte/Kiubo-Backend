// Importacion de dependencias

// Importacion de custom models
import Chat from '../models/Chat.js' // Modelo de conversacion
import Mensaje from '../models/Mensaje.js'; // Modelo de mensaje
import { getReceiverSocketId } from '../socket/socket.js';
import { io } from '../socket/socket.js'

const obtenerMensajes = async (req, res) => {
    // Extraer el ID del usuario con el que se quiere chatear de la URL
    const { id } = req.params;
    const receptor = id;

    // Extraer el ID del usuario de la request
    const emisor = req.usuario._id;
    
    try {
        // Busca en la DB por el chat que contenga los dos ID
        const chat = await Chat.findOne({
            miembros: { $all: [emisor, receptor]}
        }).populate('mensajes');

        // si no existe la conversacion retorna un arreglo vacio
        if(!chat) {
            return res.status(200).json([])
        }

        // responde con los mensajes extraidos de la coleccion mensajes
        res.status(200).json(chat.mensajes);
    } catch (err) {
        
    }


};

const enviarMensaje = async (req, res) => {
    // Extraes el mensaje del cuerpo de la petición
    const { mensaje } = req.body;

    // Extraer el ID del receptor de la URL
    const { id } = req.params;
    const receptor = id

    // Extraer el ID del usuario de la request
    const emisor = req.usuario._id;

    try {
        // Busca la conversacion en la base de datos
        let chat = await Chat.findOne({
            miembros: { $all: [emisor, receptor] }
        });

        // Si no existe la conversacion la crea
        if(!chat) {
            chat = await Chat.create({
                miembros: [emisor, receptor]
            });
        }

        // Crea el mensaje
        const mensajeNuevo = new Mensaje({ emisor, receptor, mensaje });

        // Añade el ID del mensaje a la conversacion
        chat.mensajes.push(mensajeNuevo._id);

        // Guarda en paralelo los cambios realizados en la base de datos
        await Promise.all([
            chat.save(), 
            mensajeNuevo.save()
        ]);

        // Socket
        const receiverSocketId = getReceiverSocketId(receptor);
        if(receiverSocketId === receptor) {
            io.to(receiverSocketId).emit('newMessage', mensajeNuevo)
        }


        return res.status(201).json(mensajeNuevo)

        
    } catch (err) {
        console.log(err);
        console.log('hola')
        const error = new Error('No se encontro el usuario'); 
        return res.status(403).json({msg: error.msg});
    };
};


export {
    obtenerMensajes,
    enviarMensaje
};







     