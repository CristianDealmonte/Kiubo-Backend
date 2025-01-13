import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    miembros: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    ],
    mensajes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mensaje',
            default: []
        }
    ]

}, {timestamps:true});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;