import { Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  create() {
    return this.mailerService.sendHtmlPlain(
      'Hello ✔',
      ['some@email.es'],
      '<p>HOLA TEST</p>',
      'some2@email.com',
      'some3@email.com',
    );
  }

  @Post('hbs')
  createHbs() {
    return this.mailerService.sendFc(
      'some@email.com',
      'Google',
      'https://www.google.com',
    );
  }
}
