import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface ICheckMultipleServices {
  execute(url: string): Promise<boolean>;
}

type SuccessCB = () => void;
type ErrorCB = (error: string) => void;

export class CheckMultiplesServices implements ICheckMultipleServices {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCB: SuccessCB,
    private readonly errorCB: ErrorCB
  ) {}

  private callLogs(log: LogEntity){
    // Por cada uno de los LogRepository
    this.logRepository.forEach(async (logRepository) => {
      // Yo se que cada uno TIENE el metodo saveLog, por lo tanto le paso el log que estamos trabajando 
      // y se va guardando a medida que concreta uno tras otro
      await logRepository.saveLog(log);
    } );

  }


  // No es static debido a que inyectaremos dependencias
  async execute(url: string): Promise<boolean> {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error on check service: ${url}`);
      }

      const log = new LogEntity({
        message: `Check service success: ${url}`,
        level: LogSeverityLevel.low,
        origin: "check-multiple-service.ts",
        createdAt: new Date(),
      });
      this.callLogs(log);
      this.successCB();
      return true;
      
    } catch (error) {
      const errorMsg = `${error}`;
      const log = new LogEntity({
        message: errorMsg,
        level: LogSeverityLevel.medium,
        origin: 'check-multiple-service.ts',
        createdAt: new Date()
    });
      this.callLogs(log);
      this.errorCB(errorMsg);
      return false;
    }
  }
}
