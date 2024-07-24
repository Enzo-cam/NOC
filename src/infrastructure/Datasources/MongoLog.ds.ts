
import { LogModel } from "../../data/mongoDB/models/log-model";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource{
    
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = LogModel.create(log)
    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const logs = await LogModel.find({level: severityLevel})

        // Cuando tenes un argumento que unico objetivo es ser pasado a una funcion interna
        // se puede mandar la referencia a la funcion directamente
        return logs.map(LogEntity.fromObject);
    }
}
