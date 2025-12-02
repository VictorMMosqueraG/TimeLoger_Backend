import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimelogerModule } from '@/timeloger/timeloger.module';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/freelance_db'),
    TimelogerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
