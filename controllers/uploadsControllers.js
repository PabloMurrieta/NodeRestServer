
import { response } from "express";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cloudinary from 'cloudinary';

import { subirArchivo } from "../helpers/subir-archivo.js";

import { Usuario, 
         Product } from "../models/index.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
cloudinary.config(process.env.CLOUDINARY_URL);


const cargarArchivo = async (req, res = Response) => {

  try {
  const nombre = await subirArchivo (req.files,undefined,'img');
  res.json({
    nombre 
  })
    
  } catch (msg) {
    res.status(400).json({msg})
  }
}

const actulizarImg = async (req, res = response,) =>{

  const {id,coleccion} = req.params;
  let modelo;

 
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`No existe un usuario con el id ${id}`
        });
      }
      
      break;

    case 'productos':
      modelo = await Product.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`No existe un producto con el id ${id}`
        });
      }
      
      break;  
    default:
      return res.status(500).json({msg: 'Se me olvido programar eso'});
  }



  if(modelo.img){

    const  pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
      if(fs.existsSync(pathImagen)){
        fs.unlinkSync(pathImagen);
      }
  }


  const nombre = await subirArchivo (req.files,undefined,coleccion);

  modelo.img = nombre;

  await modelo.save();

  res.json({modelo})
}


const mostrarImgen = async (req, res = response) =>{

  const {id,coleccion} = req.params;
  let modelo;

 
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`No existe un usuario con el id ${id}`
        });
      }
      
      break;

    case 'productos':
      modelo = await Product.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`No existe un producto con el id ${id}`
        });
      }
      
      break;  
    default:
      return res.status(500).json({msg: 'Se me olvido programar eso'});
  }



  if(modelo.img){

    const  pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
      if(fs.existsSync(pathImagen)){
        console.log(pathImagen);
        res.setHeader('Content-Type', 'image/jpeg'); 
       return res.sendFile(pathImagen)

      }
    } 
     const pathImagen = path.join(__dirname,'../assets/no-image.jpg');
      res.setHeader('Content-Type', 'image/jpeg');
      res.sendFile(pathImagen);

}

const actulizarImgCloudinary = async (req, res = response,) =>{

  const {id,coleccion} = req.params;

  let modelo;
 


 
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`No existe un usuario con el id ${id}`
        });
      }
      
      break;

    case 'productos':
      modelo = await Product.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`No existe un producto con el id ${id}`
        });
      }
      
      break;  
    default:
      return res.status(500).json({msg: 'Se me olvido programar eso'});
  }



  
  if(modelo.img){

    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id]  = nombre.split('.');

     cloudinary.uploader.destroy(public_id);
  }
  
  const {tempFilePath} = req.files.archivo;
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
 
  modelo.img = secure_url;
  await modelo.save();

 res.json(
  modelo
 )


}

export {
    cargarArchivo,
    actulizarImg,
    mostrarImgen,
    actulizarImgCloudinary

}
