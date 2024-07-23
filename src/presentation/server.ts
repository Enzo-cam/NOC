import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/Repositories/LogRepository-impl";
import { FileSystemDS } from "../infrastructure/Datasources/FileSystem.ds";
import { EmailService } from "./email/email-service";
import { SendEmailLogs } from "../domain/use-cases/emails/email-logs";

const FileSystemLogRep = new LogRepositoryImpl(new FileSystemDS());
const emailService = new EmailService();

export class Server {
  static start() {
    // console.log("Servidor arrancando.");

    // new SendEmailLogs(emailService, FileSystemLogRep).executeAttachments([
    //   "enzo.fcam@gmail.com",
    //   "camerac09@gmail.com",
    // ]);
    new SendEmailLogs(emailService, FileSystemLogRep).executeText({
      to: "enzo.fcam@gmail.com",
      subject: "Testing NOC",
      htmlBody: "Testeando el NOC a ver si anda o no",
    });

    // emailService.sendEmailWithAttachment(
    // );

    // CronService.createJob("*/5 * * * * *", () => {
    //   new CheckService(
    //     FileSystemLogRep,
    //     () => console.log("All good"),
    //     (error) => console.log(`${error}`)
    //   ).execute("http://localhost:3000/posts");
    // });
  }
}
