// Importaciones de dependencias


// Importaciones de custom models
import Usuario from "../models/Usuario.js"; // modelo de usuario
import generarJWT from "../helpers/generarJWT.js"; // crear JWT
import generarToken from "../helpers/generarToken.js"; // crear token
import emailRegistro from "../helpers/emailRegistro.js"; // envio de email
import emailResetPassword from "../helpers/emailResetPassword.js"; // envio de email

const registrar = async (req, res) => {
    // Tomar la info de la request
    const { username, email } = req.body;

    // Prevenir usuarios duplicados
    const existeUsuario = await Usuario.findOne({email: email});
    if(existeUsuario) {
        const error = new Error('Este usuario ya esta registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        // Almacenar en la DB un nuevo usuario
        const usuario = new Usuario(req.body);
        const usuarioAlmacenado = await usuario.save();
        
        // Envia email de confirmación
        emailRegistro({username: username, email: email, token: usuarioAlmacenado.token})
        

        // Respuesta a front
        return res.json(usuarioAlmacenado);
    } catch (error) {
        console.log(error);
    }

    return res.json({msg: 'registrando usuario'});
}

const confirmar = async (req, res) => {
    // Toma el token de la URL
    const { token } = req.params

    // Busca en la DB si existe algun usuario con este token
    const usuarioConfirmar = await Usuario.findOne({token: token});

    // Si no se encuentra el token en la BD
    if(!usuarioConfirmar) {
        const error = new Error('Huvo un error en el enlace');
        return res.status(404).json({msg: error.message});
    }        

    try {
        // Se elimina el token de la DB
        usuarioConfirmar.token = null;
        // Se confirma la cuenta del usuario
        usuarioConfirmar.confirmado = true;
        // Se almacena en la DB la info
        await usuarioConfirmar.save();
        // Respuesta al front
        res.status(200).json({'msg': 'Usuario confirmado correctamente'});
    } catch (err) {
        console.log(err); 
        const error = new Error('Hubo un error al registrar a este usuario');
        res.status(500).json({msg: error.message});
    }
}

const autenticar = async (req, res) => {
    // Tomar la info del request
    const { email, password } = req.body;

    // Buscar al usuario en la DB
    const usuario = await Usuario.findOne({email: email});

    // Comprobar si el usuario existe
    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    // Comprobar si el usuario esta confirmado
    if(!usuario.confirmado) {
        const error = new Error('Tu cuenta no hs sido confirmada');
        return res.status(403).json({msg: error.message}); 
    }

    // Comprobar la contraseña
    if( await usuario.comprobarPassword(password) ) {
        // Autenticar al usuario
        res.json({token: generarJWT(usuario.id)});
    }
    else {
        const error = new Error('La contraseña es incorrecta');
        return res.status(403).json({msg: error.message}); 
    }
}

const cambiarPassword = async (req, res) => {
    // Tomar la info de la requets
    const { email } = req.body;

    // Verificar que exista el usuario en la DB
    const existeUsuario = await Usuario.findOne({email: email});
    if(!existeUsuario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg: error.message});
    }

    try {
        // Genera un token para el usuario
        existeUsuario.token = generarToken();
        // Guarda en la DB
        await existeUsuario.save();
        res.json({msg: 'Te hemos enviado un email con las instrucciones'});
    
        // Enviar email con instrucciones
        emailResetPassword({
            email: email, 
            username: existeUsuario.username, 
            token: existeUsuario.token
        });


    } catch(error) {
        console.log(error.message);
    }

}

const comprobarToken = async (req, res) => {

    // Toma el token de la URL
    const { token } = req.params;

    // Comprueba que existe un usuario con este token
    const toeknValido = await Usuario.findOne({token: token});
    if(!toeknValido) {
        const error = new Error('Hubo un error en el enlace');
        res.status(400).json({msg: error.message});
    }
    else {
        res.json({msg: 'Token valido, el usuario existe'});
    }
}

const nuevoPassword = async (req, res) => {
    // Tomar el token de la URL
    const { token } = req.params;

    // Tomar el nuevo password del formulario
    const { password } = req.body;

    //Busca el usuario que concuerde con el token en la DB
    const usuario = await Usuario.findOne({token: token});

    // Si no existe o no lo encuentra manda error
    if(!usuario) {
        const error = new Error('Hubo un error en el enlace');
        return res.status(400).json({msg: error.message}); 
    }

    try {
        // Elimina el token de la DB
        usuario.token = null;

        // Reescribe la contraseña del usuario
        usuario.password = password;

        // Guarda cambios en la DB
        usuario.save();

        // Respuesta a front
        res.json({msg: 'Contraseña modificada correctamente'});
    } catch (error) {
        console.log(error);
    }
}

export {
    registrar,
    confirmar,
    autenticar,
    comprobarToken,
    cambiarPassword,
    nuevoPassword,
}