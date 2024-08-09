import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CounterService } from './counter.service';
import { CounterDto } from './dto/counter.dto';

@Controller('counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Get()
  getLatest() {
    return this.counterService.getLatest();
  }

  @Post()
  save(@Body() counter: CounterDto) {
    return this.counterService.updateLatest(counter);
  }
}
