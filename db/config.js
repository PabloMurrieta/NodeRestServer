import mongoose from "mongoose";
import 'dotenv/config';




const dbConnection = async () =>{

    try {
      await  mongoose.connect(process.env.MONGODB_CNN);

      console.log('Bases de datos online');

        
    } catch (error) {
        console.log(error);
        throw new Error('Erro al inicializar la base de datos');
    }
}

export{
    dbConnection
}