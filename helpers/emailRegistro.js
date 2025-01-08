import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    // Configurar el email
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
    });

    // Tomar los datos a enviar
    const { email, username, token } = datos;

    // Enviar el email
    const info = await transport.sendMail({
        // Contruir el correo
        from: 'Kiubo',
        to: email,
        subject: 'Comprueba tu cuenta en Kiubo',
        text: 'Confirma tu cuenta en Kiubo',
        html: ` <p>Hola: ${username}, cmprueba tu cuenta en Kiubo</p>
            <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/confirm/${token}">Comprobar Cuenta</a> </p>
            <p>Si tu no create esta cuenta puedes ignorar este mensaje</p>
        `
    });

    console.log(`mensaje enviado: %s`, info.messageId);
}

export default emailRegistro;