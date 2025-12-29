import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './schemas/contact.schema/contact.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  async findAll(workspaceId: string): Promise<Contact[]> {
    return this.contactModel.find({ workspaceId }).exec();
  }

  async findOne(id: string, workspaceId: string): Promise<Contact> {
    const contact = await this.contactModel.findOne({ _id: id, workspaceId }).exec();
    if (!contact) {
      throw new NotFoundException(`Contact #${id} not found`);
    }
    return contact;
  }

  async create(createContactDto: any, workspaceId: string): Promise<Contact> {
    try {
      const createdContact = new this.contactModel({
        ...createContactDto,
        workspaceId,  // ← THIS LINE FIXES IT
      });
      return await createdContact.save();
    } catch (error) {
      throw new BadRequestException(`Invalid contact data: ${error.message}`);
    }
  }

  async update(id: string, updateContactDto: any, workspaceId: string): Promise<Contact> {
    const updated = await this.contactModel.findOneAndUpdate(
      { _id: id, workspaceId },
      updateContactDto,
      { new: true }
    ).exec();
    if (!updated) {
      throw new NotFoundException(`Contact #${id} not found`);
    }
    return updated;
  }

  async remove(id: string, workspaceId: string): Promise<void> {
    const result = await this.contactModel.deleteOne({ _id: id, workspaceId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Contact #${id} not found`);
    }
  }
}