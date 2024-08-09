import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExternalService } from './external.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [],
  providers: [ExternalService],
})
export class ExternalModule {}
