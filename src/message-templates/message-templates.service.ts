import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageTemplate } from './schemas/message-template.schema';

@Injectable()
export class MessageTemplatesService {
  constructor(
    @InjectModel(MessageTemplate.name) private templateModel: Model<MessageTemplate>,
  ) {}

  async findAll(workspaceId: string) {
    return this.templateModel.find({ workspaceId }).exec();
  }

  async create(dto: any, workspaceId: string) {
    const created = new this.templateModel({ ...dto, workspaceId });
    return created.save();
  }

  async update(id: string, dto: any, workspaceId: string) {
    return this.templateModel.findOneAndUpdate(
      { _id: id, workspaceId },
      dto,
      { new: true }
    ).exec();
  }

  async delete(id: string, workspaceId: string): Promise<any> {
    return this.templateModel.deleteOne({ _id: id, workspaceId }).exec();
  }
}