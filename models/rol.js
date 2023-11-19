
import { Schema, model } from "mongoose";

const RoleScehma = Schema({

    rol:{
        type: String,
        required : [true, 'El rol es obligatorio']
    }
});


export default model ('Role',RoleScehma);