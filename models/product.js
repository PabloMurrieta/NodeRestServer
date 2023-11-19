
import { Schema, model } from "mongoose";
import {Category} from "../models/index.js"

const ProductScehma = Schema({

    name:{
        type: String,
        required : [true, 'El nombre es obligatorio'],
        unique: true
    },
    Estado:{
        type: Boolean,
        default:true,
        require:true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        require:true
    },
    precio:{
        type: Number,
        default:0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'Category',
        require : true
    },
    descripcion:{type:String},
    disponible:{type: Boolean, default:true},
    img:{type:String}

    
});

ProductScehma.methods.toJSON = function () {
    const { __v, Estado, ...data } = this.toObject();
    return data;
 }


export default model ('Product', ProductScehma);