import bcryptjs from 'bcryptjs'
import {  response } from "express";
import Usuario from "../models/usuario.js";


const usuariosGet = async (req = request, res = response) => {

   const {limit = 5, desde = 0} = req.query;

   const query = {Estado : true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
    });
 }


 const usuariosPut = async (req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    if(password){

    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt ); 

    }

    const usuario = await Usuario.findByIdAndUpdate(id, { $set: resto }, { new: true });

    res.json(usuario);
 }


 const usuariosPost = async (req, res = response) => {
    

    const {name, email, password, rol} = req.body;
    const usuario = new Usuario({name, email, password, rol});


   const salt = bcryptjs.genSaltSync();
   usuario.password = bcryptjs.hashSync( password, salt );  

    await usuario.save();


    res.json({
        msg: 'Post API-Controller',
        usuario    
    });
 }


 const usuariosDelete = async (req, res = response) => {


    const {id} = req.params;

   const usuario = await Usuario.findByIdAndUpdate(id, { Estado: false } );
   const usuarioAutenticado = req.usuario;

    
    res.json({ usuario, usuarioAutenticado });
 }


 const usuariosPath = (req, res = response) => {

    res.json({
        msg: 'Path API-Controller'
    });
 }


 export {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPath
 }