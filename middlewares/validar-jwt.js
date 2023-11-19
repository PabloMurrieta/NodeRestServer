import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js'
import usuario from '../models/usuario.js';


const validarJWT = async (req = request, res = response, next) =>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la aplicacion'
        })
    }

    try {
       
        const {uid}  =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.usuario = await Usuario.findById(uid);

        if(!req.usuario.Estado){
            return res.status(401).json({
                msg:'TOKEN NO VALIDO, usuario con estado false'
            })
        }


      
        req.usuario;
        next();


     } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
     }


 }

 export{
    validarJWT
 }