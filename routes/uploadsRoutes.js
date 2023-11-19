import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos.js';
import { validarArchivo } from '../middlewares/validar-archivo.js';

import { validarColecciones } from '../helpers/db-validators.js';

import { actulizarImgCloudinary,
         cargarArchivo, 
         mostrarImgen} from '../controllers/uploadsControllers.js';


const routerOploads = Router();

routerOploads.post('/', cargarArchivo)

routerOploads.put('/:coleccion/:id',[
    
    validarArchivo,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => validarColecciones(c,['usuarios','productos'])),
    validarCampos

],actulizarImgCloudinary)

routerOploads.get('/:coleccion/:id',[

    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => validarColecciones(c,['usuarios','productos'])),
    validarCampos
],mostrarImgen)

export{
    routerOploads
}
