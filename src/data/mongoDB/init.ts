import mongoose, { mongo } from "mongoose";

interface ConnectOpts{
    mongoUrl: string;
    dbName: string;
}

export class MongoDB {
    static async connect(options: ConnectOpts){
        const {mongoUrl, dbName} = options;
        console.log(mongoUrl, dbName)

        try {
            await mongoose.connect(mongoUrl, { 
                dbName: dbName,
            })            
            
            console.log("Base de datos conectada.")
        } catch (error) {
            console.log("Error al conectar la base de datos")
            throw error
        }
    }
}