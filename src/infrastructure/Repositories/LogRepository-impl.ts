import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

// The objective of this implementation is if we want to change our datasource, we only have to pass the new DS
export class LogRepositoryImpl implements LogRepository {
    
    // We have to receive the Datasource, SQL/Mongo/Redis, etc
    constructor(
        private readonly logDatasource: LogDatasource,
    ){}
    
    // Once we have the Datasource, we can save the log we want 
    async saveLog(log: LogEntity): Promise<void> {
        await this.logDatasource.saveLog(log)        
    }

    // Or get the logs that are saved in our DS based in the severity level
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return await this.logDatasource.getLogs(severityLevel)
        
    }
}