import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Campaign extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['draft', 'sending', 'sent', 'paused'] })
  status: string;

  @Prop({ type: Types.ObjectId, required: true })
  templateId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], default: [] })
  contactIds: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, required: true })
  workspaceId: Types.ObjectId;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);