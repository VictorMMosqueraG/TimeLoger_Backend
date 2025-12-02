import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TimelogerService } from '@/timeloger/timeloger.service';
import { CreateTimelogerDto } from '@/timeloger/dto/create-timeloger.dto';
import { UpdateTimelogerDto } from '@/timeloger/dto/update-timeloger.dto';


function mapDoc(doc: any) {
  if (!doc) return doc;
  const plain = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
  const id = plain.numericId != null ? String(plain.numericId) : String(plain._id);

  return {
    id,
    cliente: plain.cliente ?? '',
    proyecto: plain.proyecto ?? '',
    fecha: plain.fecha ?? '',
    horas: plain.horas ?? 0,
    tarifaHora: plain.tarifaHora ?? 0,
    ingreso: plain.ingreso ?? 0,
    uid: plain.uid ?? '',
  };
}

@Controller('timeloger')
export class TimelogerController {
  constructor(private readonly service: TimelogerService) {}

  @Post()
  async create(@Body() dto: CreateTimelogerDto) {
    const created = await this.service.create(dto);
    return mapDoc(created);
  }

  @Get()
  async findAll() {
    const list = await this.service.findAll();
    return Array.isArray(list) ? list.map(mapDoc) : list;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const doc = await this.service.findOne(id);
    return mapDoc(doc);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTimelogerDto) {
    const updated = await this.service.update(id, dto);
    return mapDoc(updated);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
