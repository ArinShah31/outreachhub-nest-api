import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageTemplatesController } from './message-templates.controller';
import { MessageTemplatesService } from './message-templates.service';
import { MessageTemplate, MessageTemplateSchema } from './schemas/message-template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MessageTemplate.name, schema: MessageTemplateSchema }]),
  ],
  controllers: [MessageTemplatesController],
  providers: [MessageTemplatesService],
})
export class MessageTemplatesModule {}