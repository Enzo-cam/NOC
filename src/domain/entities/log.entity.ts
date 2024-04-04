
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = "high"
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message : string;
    public createdAt: Date;

    constructor(message: string, level:LogSeverityLevel ){
        this.message = message;
        this.level = level;
        this.createdAt = new Date()
    }

    // Create instance based in JSON string
    static fromJson = (json: string): LogEntity => {
        const {message, level} = JSON.parse(json)

        const log = new LogEntity(message, level)
        log.createdAt = new Date()
        return log;
    }

}