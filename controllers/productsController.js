import { body } from "express-validator";
import { Product } from "../models/index.js";
import { response } from "express";



const obtenerProducts = async (req, res = response) =>{

    const{limit = 5, desde= 0} = req.query;
    const query = {Estado :true};

    const [total, product] = await Promise.all([
            Product.countDocuments(query),
            Product.find( query)
                .skip(Number(desde))
                .limit(Number(limit))
                .populate('usuario','name')
    ])

    res.json({
          total,
          product

    })

}

const obtenerProductById = async (req, res = response)=>{

    const {id} = req.params;

    const produc = await Product.findById(id);

    res.json({
        produc
    })
    
}

//Crear nuevo producto
const crearPorducto = async (req, res = response) => {
    try {
        const { name, Category } = req.body;

        const productName = name.toUpperCase();

        const producDB = await Product.findOne({ name: productName });

        if (producDB) {
            return res.status(400).json({
                msg: `El producto ${producDB.name} ya existe`
            });
        }

        const data = {
            name: productName,
            usuario: req.usuario._id,
            Category: Category 
        };

        const product = new Product(data);
        await product.save();

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error en el servidor'
        });
    }
};

const ActulizarPorduct = async (req, res = response) =>{

   const {id} = req.params;
   const {Estado, usuario,...data} = req.body;

   data.name = data.name.toUpperCase();

   data.usuario = req.usuario._id;

   const product = await Product.findByIdAndUpdate(id,data,{new:true});

   res.json({
    product
   })


}

const borrarPorduct = async (req, res = response) =>{

    const {id} = req.params;

    const product = await Product.findByIdAndUpdate(id,{Estado:false}, {new:true});

    res.json({
        product
    })
}


export {

    ActulizarPorduct,
    crearPorducto,
    borrarPorduct,
    obtenerProducts,
    obtenerProductById,

}