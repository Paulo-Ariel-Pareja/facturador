import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { WebModule } from './web/web.module';
import { ErpModule } from './erp/erp.module';
import { ExternalModule } from './external/external.module';
import { MailerModule } from './mailer/mailer.module';
import { CounterModule } from './counter/counter.module';

import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import companyConfig from './config/company.config';
import erpConfig from './config/erp.config';
import emailConfig from './config/mail.config';

import { Web } from './web/entities/web.entity';
import { Articulo } from './web/entities/articulo.entity';
import { Counter } from './counter/entities/counter.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig, companyConfig, erpConfig, emailConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('dbConfig.host'),
        port: configService.get<number>('dbConfig.port'),
        username: configService.get<string>('dbConfig.username'),
        password: configService.get<string>('dbConfig.password'),
        database: configService.get<string>('dbConfig.database'),
        entities: [Web, Articulo, Counter],
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    WebModule,
    ErpModule,
    ExternalModule,
    CounterModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
