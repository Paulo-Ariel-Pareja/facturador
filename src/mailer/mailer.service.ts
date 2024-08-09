import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private host: string;
  private port: string;
  private user: string;
  private pass: string;
  private defaultMail: string;
  private bcc: string;

  constructor(private readonly configService: ConfigService) {
    this.host = this.configService.getOrThrow('emailConfig.host');
    this.port = this.configService.getOrThrow('emailConfig.port');
    this.user = this.configService.getOrThrow('emailConfig.user');
    this.pass = this.configService.getOrThrow('emailConfig.pass');
    this.defaultMail = this.configService.getOrThrow('emailConfig.defaultMail');
    this.bcc = this.configService.get('emailConfig.bcc');
  }
  sendEmail = async (
    to: string,
    subject: string,
    html: string,
    cc?: string,
  ) => {
    const transporter = nodemailer.createTransport({
      host: this.host,
      port: Number(this.port),
      secure: false,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });

    const info = await transporter.sendMail({
      from: this.defaultMail, // sender address
      to,
      cc,
      bcc: this.bcc,
      subject,
      //text: 'Hello world?',
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
  };
}
