        // Configuracion del servidor 

// Importaciones de dependiencias
import express  from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


// Importaciones de custom modules
import { app, server } from './socket/socket.js';
import connectarDB from './config/db.js'; // Base de datos
import authRoutes from './routes/authRoutes.js'; // Rutas de autenticacion
import mensajesRoutes from './routes/mensajesRoutes.js'; // Rutas de autenticacion
import userRoutes from './routes/usuarioRoutes.js';



// Definir la configuracion de variables de entorno
dotenv.config(); 

// Conexion a la base de datos
connectarDB();

// Servir Contenido multimedia al usuario
app.use('/public', express.static('uploads'));

// Solucion de CORS
const dominiosPermitidos = [process.env.FRONTEND_URL]; // Lista de dominios admitidos para realizar peticiones a la api de backend
const corsOptions = { 
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) { // Si el origen se encuentra dentro de la lista de dominios permitidos admite la peticion
            //El origen del req esta permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}
app.use(cors(corsOptions));

// Indicar como leer las peticiones
app.use(express.json()); 

// Enrutamiento
app.use('/api/auth', authRoutes);
app.use('/api/message', mensajesRoutes);
app.use('/api/user', userRoutes);

// Asignacion de puerto al servidor 
const PORT = process.env.PORT || 4000;

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto http://localhost:${PORT}`);
})