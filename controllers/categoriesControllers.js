import { response } from "express";
import {Category} from  "../models/index.js";


const obtenerCategories = async (req, res = response) =>{
   const {limit = 5, desde = 0} = req.query;
   const query = {Estado : true};

    const [total, category] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .skip(Number(desde))
        .limit(Number(limit))
        .populate('usuario','name')
    ])
    res.json({
        total,
        category
    }) 
}

const obtenerCategoryById = async (req, res = response) =>{

const  {id} = req.params;
const category = await Category.findById(id).populate('usuario', 'name');

res.json({

    category
})
}



const crearCategory = async (req, res = response) =>{

    const name = req.body.name.toUpperCase();

    const categoriaDb =  await Category.findOne({name});

    if(categoriaDb){
        return res.status(400).json({
            msg:`La categoia ${categoriaDb.name}, ya existe`
        });
    }

    const data = {
        name,
        usuario: req.usuario._id
    }

    const category = new Category(data)
    await category.save();
    res.status(201).json(category);

}

const ActulizarCategory = async (req, res = response) =>{

    const {id} = req.params;

    const {Estado,usuario, ...data} = req.body;

    data.name = data.name.toUpperCase();

    data.usuario = req.usuario._id;

    const category = await Category.findByIdAndUpdate(id,{$set:data}, {new:true});

    res.json({
        category
    })
}



const borrarCategory = async (req, res = response) =>{

    const {id} = req.params;

    const category = await Category.findByIdAndUpdate(id,{Estado:false},{new:true});
    const usuarioAuntenticado = req.usuario;
    const { name,email,rol} = usuarioAuntenticado;

    res.json({
        category,
        name,email,rol
    })
}

export {
    crearCategory,
    obtenerCategories,
    obtenerCategoryById,
    ActulizarCategory,
    borrarCategory
}