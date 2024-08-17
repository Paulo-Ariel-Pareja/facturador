import { Module } from '@nestjs/common';
import { ErpService } from './erp.service';
import { FacturaHelper } from './helper/factura.helper';

@Module({
  controllers: [],
  providers: [ErpService, FacturaHelper],
})
export class ErpModule {}
