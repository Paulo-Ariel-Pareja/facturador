import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';
import { Counter } from './entities/counter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Counter])],
  controllers: [CounterController],
  providers: [CounterService],
})
export class CounterModule {}
