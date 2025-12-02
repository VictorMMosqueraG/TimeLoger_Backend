import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TimelogerDocument = Timeloger & Document;

@Schema({ timestamps: true })
export class Timeloger {
  @Prop({ required: true })
  cliente: string;

  @Prop({ required: true })
  proyecto: string;

  @Prop({ required: true })
  fecha: string; 

  @Prop({ required: true })
  horas: number;

  @Prop({ required: true })
  tarifaHora: number;

  @Prop({ required: true })
  ingreso: number;
  
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true, unique: true })
  numericId: number;
}

export const TimelogerSchema = SchemaFactory.createForClass(Timeloger);
