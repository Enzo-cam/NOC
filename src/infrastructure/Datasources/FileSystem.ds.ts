import fs from 'fs'
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";

export class FileSystemDS implements LogDatasource {
    private readonly logPath = 'logs/'
    private readonly allLogsP = 'logs/all-logs.log'
    private readonly mediumLogsP = 'logs/logs-medium.log'
    private readonly highLogsP = 'logs/logs-high.log'
    
    constructor(){
        this.createLogFiles()
    }

    // Private to only be execute here
    // Check if the logPath folder exists
    private createLogFiles = () => {
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath)
        }

        [   this.allLogsP,
            this.mediumLogsP,
            this.highLogsP
        ].forEach(path => {
            if(fs.existsSync(path)) return
            fs.writeFileSync(path, '')
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logJson = `${JSON.stringify(newLog)}\n`
        fs.appendFileSync(this.allLogsP, logJson)

        if(newLog.level === 'low') return;

        if(newLog.level === 'medium'){
            fs.appendFileSync(this.mediumLogsP, logJson)
        }else{
            fs.appendFileSync(this.highLogsP, logJson)
        }
    }

    private getLogsFromFile = (path: string): LogEntity[] =>{
        const content = fs.readFileSync(path, 'utf-8')

        if(!content) return []

        const logs = content.split('\n').map(LogEntity.fromJson)
        return logs;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch(severityLevel){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsP)
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsP)
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsP)
            default: 
                throw new Error(`${severityLevel} not implemented.`)
        }
    }
}
