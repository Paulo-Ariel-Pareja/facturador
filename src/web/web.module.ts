import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { WebService } from './web.service';

import { CronjobWebService } from './cronjob-web.service';
import { ErpService } from '../erp/erp.service';
import { FacturaHelper } from '../erp/helper/factura.helper';
import { ExternalService } from '../external/external.service';
import { CounterService } from '../counter/counter.service';
import { MailerService } from '../mailer/mailer.service';

import { Web } from './entities/web.entity';
import { Articulo } from './entities/articulo.entity';
import { Counter } from '../counter/entities/counter.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Web, Articulo, Counter])],
  controllers: [],
  providers: [
    WebService,
    CronjobWebService,
    ErpService,
    FacturaHelper,
    ExternalService,
    CounterService,
    MailerService,
  ],
})
export class WebModule {}
