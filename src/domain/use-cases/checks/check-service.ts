import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface ICheckService{
    execute(url:string) :Promise<boolean>;
}

type SuccessCB = () => void;
type ErrorCB = (error: string) => void;

export class CheckService implements ICheckService {
    
    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCB: SuccessCB,
        private readonly errorCB: ErrorCB
    ){}


    // No es static debido a que inyectaremos dependencias
    async execute(url:string): Promise<boolean>{
        try {
            const res = await fetch(url);
            if(!res.ok){
                throw new Error(`Error on check service: ${url}`)
            }

            const log = new LogEntity(`Service ${url} is working.`,LogSeverityLevel.low)
            await this.logRepository.saveLog(log)
            this.successCB();
            return true;
        } catch (error) {
            const errorMsg = `${error}`
            const log = new LogEntity(errorMsg,LogSeverityLevel.medium)
            await this.logRepository.saveLog(log)
            this.errorCB(errorMsg)
            return false;
        }
    }
}