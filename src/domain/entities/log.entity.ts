
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = "high"
}

export interface LogEntityOpts {
    message: string;
    level: LogSeverityLevel;
    createdAt?:  Date;
    origin: string;
}


export class LogEntity {

    public level: LogSeverityLevel;
    public message : string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOpts){
        this.message = options.message;
        this.level = options.level;
        this.createdAt = new Date()
        this.origin = options.origin;
    }

    // Create instance based in JSON string
    static fromJson = (json: string): LogEntity => {
        json = (json=== '') ? '{}' : json;

        const {message, level, createdAt, origin} = JSON.parse(json)

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin
        })
        return log;
    }


    static fromObject(obj: {[key: string]: any}): LogEntity{
        const {message, level, createdAt, origin} = obj;

        const log = new LogEntity({
            message,
            level,
            createdAt: new Date(createdAt),
            origin
        })

        return log;

    }
}