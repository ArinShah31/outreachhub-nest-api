import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
	@Prop({ required: true, unique: true })
	username: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true, enum: ['editor', 'viewer'] })
	role: 'editor' | 'viewer';

	@Prop({ type: Types.ObjectId, required: true })
	workspaceId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);