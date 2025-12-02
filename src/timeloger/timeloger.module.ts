import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Timeloger, TimelogerSchema } from '@/timeloger/schemas/timeloger.schema';
import { TimelogerRepository } from '@/timeloger/timeloger.repository';
import { TimelogerService } from '@/timeloger/timeloger.service';
import { TimelogerController } from '@/timeloger/timeloger.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Timeloger.name, schema: TimelogerSchema }])],
  providers: [TimelogerRepository, TimelogerService],
  controllers: [TimelogerController],
  exports: [TimelogerService, TimelogerRepository],
})
export class TimelogerModule {}
