import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

const ConectarDb = async ()=>{

    try {
        mongoose.connect(process.env.DB_MONGO);
        console.log('base de datos conectada');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}

export default ConectarDb;

