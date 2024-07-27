
import { LogModel } from "../../data/mongoDB/models/log-model";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SecurityLevel } from "@prisma/client";

const prisma = new PrismaClient()

const severityEnum = {
    low: SecurityLevel.LOW,
    medium: SecurityLevel.MEDIUM,
    high: SecurityLevel.HIGH
}
export class PostgreLogDataSource implements LogDatasource{

    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level]

        const newLog = await prisma.logModel.create({
            data: {
                log: log.message,
                level
            }
        })
    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const logs = await prisma.logModel.findMany({
            where: {
                level: severityEnum[severityLevel]
            }
        })

        // Cuando tenes un argumento que unico objetivo es ser pasado a una funcion interna
        // se puede mandar la referencia a la funcion directamente
        return logs.map(LogEntity.fromObject);
    }
}
