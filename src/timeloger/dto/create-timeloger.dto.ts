import { IsNotEmpty, IsString, IsISO8601, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTimelogerDto {
  @IsString()
  @IsNotEmpty()
  cliente!: string;

  @IsString()
  @IsNotEmpty()
  proyecto!: string;

  @IsISO8601()
  fecha!: string;

  @Type(() => Number)
  @IsNumber()
  horas!: number;

  @Type(() => Number)
  @IsNumber()
  tarifaHora!: number;

  @IsString()
  @IsNotEmpty()
  uid!: string;

  @Type(() => Number)
  @IsNumber()
  ingreso!: number;
}
