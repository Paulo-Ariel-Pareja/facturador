import { Module } from '@nestjs/common';
import { ErpService } from './erp.service';
import { ErpController } from './erp.controller';
import { FacturaHelper } from './helper/factura.helper';

@Module({
  controllers: [ErpController],
  providers: [ErpService, FacturaHelper],
})
export class ErpModule {}
