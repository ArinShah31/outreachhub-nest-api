import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  findAll(@GetUser() user: any) {
    return this.contactsService.findAll(user.workspaceId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: any) {
    return this.contactsService.findOne(id, user.workspaceId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('editor')
  create(@Body() createContactDto: any, @GetUser() user: any) {
    return this.contactsService.create(createContactDto, user.workspaceId);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('editor')
  update(@Param('id') id: string, @Body() updateContactDto: any, @GetUser() user: any) {
    return this.contactsService.update(id, updateContactDto, user.workspaceId);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('editor')
  remove(@Param('id') id: string, @GetUser() user: any) {
    return this.contactsService.remove(id, user.workspaceId);
  }
}