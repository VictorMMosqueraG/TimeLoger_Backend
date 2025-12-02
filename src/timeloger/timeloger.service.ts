import { Injectable } from '@nestjs/common';
import { TimelogerRepository } from '@/timeloger/timeloger.repository';
import { CreateTimelogerDto } from '@/timeloger/dto/create-timeloger.dto';
import { UpdateTimelogerDto } from '@/timeloger/dto/update-timeloger.dto';

@Injectable()
export class TimelogerService {
  constructor(private readonly repo: TimelogerRepository) {}

  create(dto: CreateTimelogerDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.getAll();
  }

  findOne(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, dto: UpdateTimelogerDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
