// Importacion de dependencias
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


// Importacion de custom modules
import generarToken from '../helpers/generarToken.js';
 

// Crear esquema del documento
const usuarioSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },    
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: generarToken(),
    },
    confirmado: {
        type: Boolean, 
        default: false 
    },
    descripcion:{
        type: String,
        default: "Comparte una descripcion acerca de ti",
    },
    profilePicture: {
        type: String,
        default: `IconoAnimal.png`,
    },    
    bannerImg: {
        type: String,
        default: 'bannerDefault.jpg',
    },


}, {timestamps: true});
 
// Hasea el password antes de almacenarlo en la DB
usuarioSchema.pre('save', async function(next) {
    // Evita hashear si ya se hizo previamente
    if( !this.isModified('password') ) {
        next();
    }

    // Genera hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

// Comprobar el password del usuario
usuarioSchema.methods.comprobarPassword = async function(passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
}


// Crea una nueva collección
const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;