import nodemailer from 'nodemailer';

const emailResetPassword = async (datos) => {
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

    const info = await transport.sendMail({
        // Configura el mail
        from: "Kiubo",
        to: email,
        subject: 'Reestablece tu Contraseña',
        text: 'Reestablece tu Contraseña',
        html: ` <p>Hola: ${username}, has solicitado reestablecer tu password</p>
            <p>entra al siguiente enlace para generar una nueva contraseña: <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Restablecer  ontraseña</a> </p>
            <p>Si tu no create esta cuenta puedes ignorar este mensaje</p>
        `
    });
}

export default emailResetPassword;