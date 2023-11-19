
import { Schema, model} from "mongoose";

const UsuarioSchema = Schema({

    name:{
        type:String,
        required:[true, 'El nombre es obligatorio']
    },
    email:{
        type:String,
        required:[true, 'El email es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'La password es obligatoria'],
        
    },
    img:{
        type:String,
        
    },
    rol:{
        type:String,
        required:['ADMIN_ROLE','USER_ROLE'],
        
    },
    Estado:{
        type:Boolean,
        default:true
        
    },
    google:{
        type:Boolean,
        default:false
        
    },
});


UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id,...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};


export default model('Usuario',UsuarioSchema)