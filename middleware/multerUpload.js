import multer from 'multer';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';
import generarToken from '../helpers/generarToken.js';

const directorioActual = dirname(fileURLToPath(import.meta.url));
const mimeTypes = ['image/jpeg', 'image/png'];

const MulterUpload = multer({
    storage: multer.diskStorage({
        destination: join(directorioActual, '../uploads'),
        filename: (req, file, cb) => {
            const fileExtension = extname(file.originalname);
            const filename = file.originalname.split(fileExtension)[0];

            // devolvemos una imagen con nombre unico
            cb(null, `${filename}-${generarToken()}${fileExtension}`)
        }
    }),
    fileFilter: (req, file, cb) => {
        // Filtro de archivos permitidos
        mimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Archivo no permitido'));
    },
    limits: {
        fieldSize: 10000000
    }
});

export default MulterUpload;