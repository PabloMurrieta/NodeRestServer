import { response } from "express"


const validarArchivo = (req, res = response, next) =>{

  if (!req.files || Object.keys(req.files).length === 0||!req.files.archivo) {
     res.status(400).json({
        msg: 'No hay archivos en la petición - validar archivo'
    });
    return;
  }
  next();

}

export{
    validarArchivo
}