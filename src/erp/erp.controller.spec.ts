import { Test, TestingModule } from '@nestjs/testing';
import { ErpController } from './erp.controller';
import { ErpService } from './erp.service';

describe('ErpController', () => {
  let controller: ErpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErpController],
      providers: [ErpService],
    }).compile();

    controller = module.get<ErpController>(ErpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
