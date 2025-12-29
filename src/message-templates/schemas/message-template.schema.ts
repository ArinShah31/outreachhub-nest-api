import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class MessageTemplate extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  body: string;

  @Prop({ type: Types.ObjectId, required: true })
  workspaceId: Types.ObjectId;
}

export const MessageTemplateSchema = SchemaFactory.createForClass(MessageTemplate);