import { check } from 'express-validator';
import { Router } from 'express';
import { googleSignIn, login, renovarToken } from '../controllers/authController.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';





const routerLogin = Router();


routerLogin.post('/login',[
    
    check('email', 'El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos

],login);

routerLogin.post('/google',[
    
    check('id_token', 'Id_token es necesario').not().isEmpty(),
    validarCampos

],googleSignIn);


routerLogin.get('/',validarJWT, renovarToken);



export default routerLogin 