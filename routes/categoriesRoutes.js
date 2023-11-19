import { check } from 'express-validator';
import { Router } from 'express';

import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT} from '../middlewares/validar-jwt.js'
import { tieneRol } from '../middlewares/validar-roles.js';

import { ActulizarCategory, borrarCategory, crearCategory, obtenerCategories, obtenerCategoryById } from '../controllers/categoriesControllers.js';
import { existeCategoryPorId } from '../helpers/db-validators.js';


//Hacer middleware para las validaciones de los id Existe categoria

const routerCategories = Router();


// Obtener todas las categorias-publico
routerCategories.get('/',obtenerCategories)

//Obtener una categoria por id - publico  
routerCategories.get('/:id',[
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id Valido de Mongoose').isMongoId(),
    check('id').custom(existeCategoryPorId),
    validarCampos
],obtenerCategoryById)

//Crear una nueva categoria- privado - cualquier persona con un toke valido
routerCategories.post('/',[
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos 

],crearCategory);


//Actualizar un registro por este id -privado - cualquiera con token valido
routerCategories.put('/:id',[
validarJWT,
check('id').isMongoId(),
check('name', 'El nombre es obligatorio').notEmpty(),
validarCampos
],
ActulizarCategory)

//Borrar una categoria - ADMIN
routerCategories.delete('/:id',[

    validarJWT,
    tieneRol('ADMIN_ROLE'),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeCategoryPorId),
    validarCampos
],borrarCategory)


export default routerCategories 