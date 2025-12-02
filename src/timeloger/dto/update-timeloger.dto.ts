import { IsOptional, IsString, IsISO8601, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTimelogerDto {
  @IsOptional()
  @IsString()
  cliente?: string;

  @IsOptional()
  @IsString()
  proyecto?: string;

  @IsOptional()
  @IsISO8601()
  fecha?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  horas?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  tarifaHora?: number;

  @IsOptional()
  @IsString()
  uid?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  ingreso?: number;
}