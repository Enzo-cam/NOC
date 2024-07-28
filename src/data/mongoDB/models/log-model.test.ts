import { MongoDB } from "../init";
import { LogModel } from "./log-model";
import { envs } from "../../../configs/envs.plugins";
import mongoose from "mongoose";

describe("LogModel", () => {
    
    beforeAll(async () => {
        await MongoDB.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });
    });

    afterAll(async () => {
        await mongoose.disconnect()
    })

    // De esta forma nos aseguramos que el modelo se ha creado correctamente
    // y que se puede insertar un documento en la colección
    test("should return log model", async () => {
        const logData = {
            message: "Test log",
            level: 'low',
            origin: 'log-model.test.ts'
        } 

        const logCreated = await LogModel.create(logData)
        expect(logCreated).toMatchObject(logData)
        expect(logCreated).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String)
        }))

        await LogModel.findByIdAndDelete(logCreated.id)
    })

    // Con esto nos aseguramos que si algo cambia en el modelo, salte el test
    test("Should return the defined schema", () => {
        const schema = LogModel.schema.obj;
        expect(schema).toEqual(expect.objectContaining(
            {
                message: { type: expect.any(Function), required: true },
                origin: { type: expect.any(Function), required: true },
                level: {
                  type: expect.any(Function),
                  enum: [ 'low', 'medium', 'high' ],
                  required: true
                },
                createdAt: expect.any(Object)
              }
        ));
    })
})