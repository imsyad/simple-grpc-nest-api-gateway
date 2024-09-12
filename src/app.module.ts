import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProtousersModule } from './modules/protousers/protousers.module';

@Module({
  imports: [ProtousersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
