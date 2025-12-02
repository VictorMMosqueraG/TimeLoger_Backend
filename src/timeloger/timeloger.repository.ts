import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timeloger, TimelogerDocument } from '@/timeloger/schemas/timeloger.schema';
import { isValidObjectId } from 'mongoose';
import { CreateTimelogerDto } from '@/timeloger/dto/create-timeloger.dto';
import { UpdateTimelogerDto } from '@/timeloger/dto/update-timeloger.dto';

@Injectable()
export class TimelogerRepository {
    constructor(@InjectModel(Timeloger.name) private model: Model<TimelogerDocument>) { }

    private async getNextNumericId(): Promise<number> {
        const counters = this.model.db.collection<{ _id: string; seq: number }>('counters');

        const res = await counters.findOneAndUpdate(
            { _id: 'timeloger_numericId' },
            { $inc: { seq: 1 } },
            { upsert: true, returnDocument: 'after' },
        );
        return res.value?.seq ?? 1;
    }

    async create(dto: CreateTimelogerDto) {
        const next = await this.getNextNumericId();
        const created = new this.model({ ...dto, numericId: next });
        return created.save();
    }

    async getAll() {
        return this.model.find().sort({ fecha: -1 }).exec();
    }

    async findById(id: string) {
        const asNumber = Number(id);
        if (!Number.isNaN(asNumber) && Number.isInteger(asNumber)) {
            const docByNum = await this.model.findOne({ numericId: asNumber }).exec();
            if (!docByNum) throw new NotFoundException(`Timeloger ${id} not found`);
            return docByNum;
        }

        if (!isValidObjectId(id)) {
            throw new BadRequestException(`Invalid id format: ${id}`);
        }

        const doc = await this.model.findById(id).exec();
        if (!doc) throw new NotFoundException(`Timeloger ${id} not found`);
        return doc;
    }

    async update(id: string, dto: UpdateTimelogerDto) {
        const asNumber = Number(id);
        let query: any;

        if (!Number.isNaN(asNumber) && Number.isInteger(asNumber)) {
            query = { numericId: asNumber };
        } else {
            if (!isValidObjectId(id)) {
                throw new BadRequestException(`Invalid id format: ${id}`);
            }
            query = { _id: id };
        }

        const updated = await this.model.findOneAndUpdate(
            query,
            dto, 
            {
                new: true,  
                runValidators: true  
            }
        ).exec();

        if (!updated) {
            throw new NotFoundException(`Timeloger ${id} not found`);
        }

        return updated;
    }
    async delete(id: string) {
        const asNumber = Number(id);
        let removed = null as any;
        if (!Number.isNaN(asNumber) && Number.isInteger(asNumber)) {
            removed = await this.model.findOneAndDelete({ numericId: asNumber }).exec();
        } else {
            if (!isValidObjectId(id)) {
                throw new BadRequestException(`Invalid id format: ${id}`);
            }
            removed = await this.model.findByIdAndDelete(id).exec();
        }
        if (!removed) throw new NotFoundException(`Timeloger ${id} not found`);
        return { deleted: true };
    }
}
