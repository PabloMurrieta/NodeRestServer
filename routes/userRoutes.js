import { Router } from 'express';
import { check } from 'express-validator';

import { esAdminRole, tieneRol } from '../middlewares/validar-roles.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';


import { emailExiste, esRolValido,existeUsuarioPorId  } from '../helpers/db-validators.js';

import { usuariosDelete,
         usuariosGet,
         usuariosPath,
         usuariosPost, 
         usuariosPut } from '../controllers/userControllers.js';

const router = Router();

//En el primer argumento va la ruta y en el segundo el controlador correspondiente 
//y en caso de de poner un miderware este debe ser el 2 y el controlador pasa a ser el tercero.

router.get('/', usuariosGet);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosPut);

router.post('/', [

    //Los metodos is--() que vienen de {check} son los que hacen la validacion.
    check('name', 'El valor no es alido').not().isEmpty(),


    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExiste),


    check('password', 'El password debe ser mmas de 6 letras').isLength({min:6}),
    // *****check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),*****
    
 
    check('rol').custom(esRolValido),
    //Validar campo es elque registra que no haya visto ingun error en 
    //las anteriores validaciones, para poder continuar o detenerse segun sea el caso
    validarCampos



]
, usuariosPost);

router.delete('/:id',[
    validarJWT,
    tieneRol('ADMIN_ROLE', 'VENTAS ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
] ,usuariosDelete);

router.patch('/', usuariosPath);

export {
    router
}

