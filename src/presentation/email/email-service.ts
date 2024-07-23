import nodemailer from "nodemailer";
import { envs } from "../../configs/envs.plugins";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export interface SendMailOpts {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

interface Attachments{
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: envs.MAILER_MAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(){}

  async sendEmail(options: SendMailOpts): Promise<boolean> {

    const { to, subject, htmlBody, attachments = [] } = options;
    try {

        await this.transporter.sendMail({
            to,
            subject,
            html:htmlBody,
            attachments : attachments
        });
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithAttachment(to: string | string[] )  {
    const subject = "Testing NOC"
    const htmlBody = `
      <h1>Testeando el NOC a ver si anda o no</h1>
      <p>Este es el cuerpo del mensaje</p>
      <p>Por favor revisar los attachments</p>
    `
    const attachments: Attachments[] = [
      {
        filename: "log-medium.log",
        path: "./logs/logs-medium.log"
      },
      {
        filename: "all-logs.log",
        path: "./logs/all-logs.log"
      }
    ]

    return this.sendEmail({to, subject, htmlBody, attachments});
  }
}
