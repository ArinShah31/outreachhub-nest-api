import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign } from './schemas/campaign.schema';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
  ) {}

  async findAll(workspaceId: string) {
    return this.campaignModel.find({ workspaceId }).populate('templateId contactIds').exec();
  }

  async findOne(id: string, workspaceId: string) {
    const campaign = await this.campaignModel.findOne({ _id: id, workspaceId }).populate('templateId contactIds').exec();
    if (!campaign) throw new NotFoundException('Campaign not found');
    return campaign;
  }

  async create(dto: any, workspaceId: string) {
    const created = new this.campaignModel({ ...dto, workspaceId });
    return created.save();
  }

  async update(id: string, dto: any, workspaceId: string) {
    const updated = await this.campaignModel.findOneAndUpdate(
      { _id: id, workspaceId },
      dto,
      { new: true }
    ).exec();
    if (!updated) throw new NotFoundException('Campaign not found');
    return updated;
  }

  async delete(id: string, workspaceId: string) {
    const result = await this.campaignModel.deleteOne({ _id: id, workspaceId }).exec();
    if (result.deletedCount === 0) throw new NotFoundException('Campaign not found');
  }
}