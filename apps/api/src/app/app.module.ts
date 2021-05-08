import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiLibsModule } from './api-lib.module';

@Module({
  imports: [ApiLibsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
