import { Module } from '@nestjs/common';
import { MailerModule as MailerModuleNest } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
@Module({
  imports: [
    MailerModuleNest.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow('emailConfig.host'),
          secure: false,
          auth: {
            user: configService.getOrThrow('emailConfig.user'),
            pass: configService.getOrThrow('emailConfig.pass'),
          },
        },
        defaults: {
          from: configService.getOrThrow('emailConfig.defaultMail'),
        },
        template: {
          dir: join(__dirname, '..', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
