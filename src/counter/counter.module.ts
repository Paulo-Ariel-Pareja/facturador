import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterService } from './counter.service';
import { Counter } from './entities/counter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Counter])],
  controllers: [],
  providers: [CounterService],
})
export class CounterModule {}
