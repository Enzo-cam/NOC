import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendMailOpts } from "../../../presentation/email/email-service";

interface EmailLogUseCase {
    executeAttachments: (to: string | string[]) =>  Promise<boolean> ;
    executeText: (preEmail: SendMailOpts) => Promise<boolean>;
}
// La logica de este USE CASE es que desde aca se escriba el log
// Por lo tanto, el presentation/email-service será encargado de mandar directamente el mail, 
// sin necesidad de depender de un repositorio como el de Log

export class SendEmailLogs implements EmailLogUseCase {
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}

    async executeAttachments( to: string | string[]): Promise<boolean> {
        try {
            const sent = this.emailService.sendEmailWithAttachment(to);
            if(!sent){
                throw new Error('Error sending email');
            }

            const log = new LogEntity({
                message:  `El mail fue mandado correctamente a ${to}`,
                level: LogSeverityLevel.low,
                origin: 'email-logs.ts'
            })

            this.logRepository.saveLog(log)
            return true;

        } catch (error) {

            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'email-logs.ts'
            })

            this.logRepository.saveLog(log)
            return false;
        }
    }
    async executeText(preEmail: SendMailOpts): Promise<boolean> {

        const { to, subject, htmlBody } = preEmail;


        try {
            const sent = this.emailService.sendEmail({
                to,
                subject,
                htmlBody,
            });
            if(!sent){
                throw new Error('Error sending email');
            }

            const log = new LogEntity({
                message:  `El mail fue mandado correctamente a ${to}`,
                level: LogSeverityLevel.low,
                origin: 'email-logs.ts'
            })

            this.logRepository.saveLog(log)
            return true;

        } catch (error) {

            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'email-logs.ts'
            })

            this.logRepository.saveLog(log)
            return false;
        }
    }

}

