


import { Schema, model } from "mongoose";

const CategoryScehma = Schema({

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
    }

    
});

CategoryScehma.methods.toJSON = function () {
    const { __v, Estado, ...category } = this.toObject();
    return category;
 }


export default model ('Category', CategoryScehma);