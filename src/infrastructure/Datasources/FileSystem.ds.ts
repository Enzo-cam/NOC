import fs from 'fs'
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";

export class FileSystemDS implements LogDatasource {
    
    private readonly logPath = 'logs/'
    private readonly lowLogsP = 'logs/logs-low.log'
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

        [   this.lowLogsP,
            this.mediumLogsP,
            this.highLogsP
        ].forEach(path => {
            if(fs.existsSync(path)) return
            fs.writeFileSync(path, '')
        })
    }

  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    
  }

  saveLog(log: LogEntity): Promise<void> {

  }
}
