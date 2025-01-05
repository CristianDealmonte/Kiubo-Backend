        // Configuracion del servidor 

// Importaciones de dependiencias
import express  from 'express';
import dotenv from 'dotenv';



// Importaciones de custom modules



// creanco instancia de express
const app = express();

// Indicar como leer las request
app.use(express.json()); 

// Definir la configuracion de variables de entorno
dotenv.config(); 

// Conexion a la DB


// Enrutamiento
app.use('/', (req, res) => {
    res.json({msg: 'hola mundo'});
})

// Asignacion de puerto al servidor
const PORT = process.env.PORT || 4000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto http://localhost:${PORT}`);
})