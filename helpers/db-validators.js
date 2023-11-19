import { Category, Product } from '../models/index.js';
import Role from '../models/rol.js';
import Usuario from '../models/usuario.js';



const esRolValido = async(rol = '') =>{
    const exiteRol = await Role.findOne({rol});
    if(!exiteRol){
        throw new  Error(`El rol ${ rol} no esta registrado en la base de datos`);
    }
}


const emailExiste = async (email)  =>{

     const existeEmail = await Usuario.findOne({email});

         if(existeEmail){
            throw new  Error(`El email: ${ email} ya esta registrado en la base de datos`);
        }
     
}


const existeUsuarioPorId = async (id) =>{

     const existeUsuario = await Usuario.findById(id);

         if(!existeUsuario){
            throw new  Error(`El id: ${ id} no existe`);
        }
}

const existeCategoryPorId = async (id) =>{

    const existeCategory = await Category.findById(id);

        if(!existeCategory){
           throw new  Error(`El id: ${ id} no existe`);
       }
}


const existeProductPorId = async (id) =>{

    const existeProduct = await Product.findById(id);

        if(!existeProduct){
           throw new  Error(`El id: ${ id} no existe`);
       }
}

const existeProductName = async (name) =>{

    const existeProduct = await Product.findOne({name});

        if(existeProduct){
           throw new  Error(`El producto: ${ name} ya existe`);
       }
}

const validarColecciones =  (coleccion = '',colecciones = []) =>{


    const incluida = colecciones.includes( coleccion);
    if(!incluida){
        throw new Error(` La coleccion ${coleccion} no es permitida, ${colecciones}`)
    }

    return true;
}


export {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoryPorId,
    existeProductPorId,
    existeProductName,
    validarColecciones

}

