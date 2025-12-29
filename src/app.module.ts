import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';         
import { ContactsModule } from './contacts/contacts.module'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles/roles.guard';
import { MessageTemplatesModule } from './message-templates/message-templates.module';
import { CampaignsModule } from './campaigns/campaigns.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/outreachhub'),
    AuthModule,
    ContactsModule,
    MessageTemplatesModule,
    CampaignsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard
  },
  ],
})
export class AppModule {}