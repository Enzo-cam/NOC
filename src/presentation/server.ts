import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/Repositories/LogRepository-impl";
import { FileSystemDS } from "../infrastructure/Datasources/FileSystem.ds";

const FileSystemLogRep = new LogRepositoryImpl(
  new FileSystemDS()
)

export class Server {
  static start() {
    console.log("Servidor arrancando.");

    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        FileSystemLogRep,
        () => console.log("All good"),
        (error) => console.log(`${error}`)
      ).execute("http://localhost:3000/posts");
    });
  }
}
