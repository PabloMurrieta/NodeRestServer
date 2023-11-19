import { check } from 'express-validator';
import { Router } from 'express';

import { ActulizarPorduct, borrarPorduct, crearPorducto, obtenerProductById, obtenerProducts } from '../controllers/productsController.js';


import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { existeCategoryPorId, existeProductName, existeProductPorId } from '../helpers/db-validators.js';
import { tieneRol } from '../middlewares/validar-roles.js';


const routerProducts = new Router();

//Mostrar todos los productoss
routerProducts.get('/',obtenerProducts)

//Mostrar  producto por Id
routerProducts.get('/:id',[

    check('id', 'El id es obligatorio').notEmpty(),
    check('id', 'No es un id Valido de Mongoose').isMongoId(),
    check('id').custom(existeProductPorId),
    validarCampos
],obtenerProductById)


//Crear nuevo producto
routerProducts.post('/',[
    validarJWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('Category', 'La categoria es obligatora').notEmpty(),
    check('Category', 'No es un ID de mongo valido - categoria').isMongoId(),
    check('Category').custom(existeCategoryPorId),
    validarCampos
],crearPorducto)


//Modificar producto 
routerProducts.put('/:id',[
    validarJWT,
    check('id','El id es obligatorio').notEmpty(),
    check('id','No es un id valido de Moongose').isMongoId(),
    validarCampos

],ActulizarPorduct)


//Borrar producto
routerProducts.delete('/:id',[

    validarJWT,
    check('id','El id es obligatorio').notEmpty(),
    check('id','No es un id valido de Moongose').isMongoId(),
    check('id').custom(tieneRol),
    validarCampos

],borrarPorduct)


export{

    routerProducts
}