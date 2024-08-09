import { Controller, Get, Post } from '@nestjs/common';
import { ErpService } from './erp.service';
import mock from './mocks/fc.mock';

@Controller('erp')
export class ErpController {
  constructor(private readonly erpService: ErpService) {}

  @Get()
  findAll() {
    return this.erpService.generateFc(mock);
  }

  @Post()
  fakeData() {
    return this.erpService.fakeData();
  }
}
