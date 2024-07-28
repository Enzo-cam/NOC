
import mongoose from "mongoose"
import { envs } from "../../configs/envs.plugins"
import { MongoDB } from "./init"

describe('MongoDB init', () => {

    // Aclaramos q una vez se termine el TEST, cierre la conexion a MONGO para evitar inconvenientes
    afterAll(async () => {
        await mongoose.disconnect()
    })

    test('should connect to the database', async () => {
        const connected = await MongoDB.connect({
            mongoUrl: `${envs.MONGO_URL}`,
            dbName: `${envs.MONGO_DB_NAME}`,
        })
        console.log(connected)
        expect(connected).toBe(true)
    })

})