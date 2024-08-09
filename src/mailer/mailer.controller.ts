import { Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  create() {
    return this.mailerService.sendEmail(
      'some@email.com',
      'Hello ✔',
      '<p>HOLA TEST</p>',
      'someCC@email.com',
    );
  }
}
