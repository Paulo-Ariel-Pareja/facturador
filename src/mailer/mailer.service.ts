import { MailerService as MailerServiceNest } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  constructor(private mailerService: MailerServiceNest) {}

  async sendFc(
    to: string,
    name: string,
    url: string,
    urlCambio: string,
    bcc?: string,
  ) {
    const info = await this.mailerService.sendMail({
      to,
      bcc,
      subject: 'Te enviamos la factura de tu compra',
      template: './send-fc',
      context: {
        name,
        url,
        urlCambio,
      },
    });
    console.log('Message sent: %s', info.messageId);
  }

  async sendHtmlPlain(
    subject: string,
    to: string[],
    html: string,
    cc?: string,
    bcc?: string,
  ) {
    const info = await this.mailerService.sendMail({
      to,
      cc,
      bcc,
      subject,
      html, // html body
    });
    console.log('Message sent: %s', info.messageId);
  }
}
