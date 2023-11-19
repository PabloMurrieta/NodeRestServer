import {response} from 'express';
import bcryptjs from 'bcryptjs'

import Usuario from '../models/usuario.js';
import { generarJWT } from '../helpers/generarJWT.js';
import { googleVerify } from '../helpers/google-verify.js';

const login = async (req, res =response) =>{

    const {email, password} = req.body;

    try {

       const usuario = await Usuario.findOne({email});
       if(!usuario){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo'
        });
       }

       //Si el usuario esta activo
       if(!usuario.Estado){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - estado:false'
        });
       }

        const valiPassword = bcryptjs.compareSync(password, usuario.password);
        
        if(!valiPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password:false'
            });
        }
        
       //Generer JWT

       const token = await generarJWT(usuario.id)
    
        res.json({
           usuario,
           token
           
        })



    } catch (error) {
        console.error('Error en el controlador de login:', error); 
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
  
}

const googleSignIn = async(req, res = response) =>{

    const {id_token} = req.body;

    try {
        
        const {name, email, picture} = await googleVerify(id_token);


        let usuario = await Usuario.findOne({email});

        //Si no existe
        if(!usuario){
            //Tengo que crearlo
            const data = {

                name,
                email,
                password:':P',
                google: true,
                rol: "USER_ROLE",
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        if(!usuario.Estado){
            return res.status(401).json({
                msg:'hable con el administrador, usuario bloqueado'
            })
        }

        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token,
            email
        })  

    }catch (error) {
        res.status(400).json({
            ok:false,
            msg:' El token no se pudo verificar'
        })
        console.log(error);
        
    }

    
}



const renovarToken = async (req, res = response) =>{

    const {usuario} = req;
    const token = await generarJWT(usuario.id)

    res.json({
        usuario,
        token
    })
}

export{
    login,
    googleSignIn,
    renovarToken

}