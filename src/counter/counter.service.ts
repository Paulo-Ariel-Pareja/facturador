import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Counter } from './entities/counter.entity';
import { CounterDto } from './dto/counter.dto';

@Injectable()
export class CounterService {
  private readonly logger = new Logger(CounterService.name);

  constructor(
    @InjectRepository(Counter)
    private counterDb: Repository<Counter>,
  ) {}
  getLatest() {
    return this.counterDb.findOne({
      select: {},
      where: {},
      order: { fc_number: 'DESC' },
    });
  }

  updateLatest(counter: CounterDto) {
    return this.counterDb.save(counter);
  }
}
