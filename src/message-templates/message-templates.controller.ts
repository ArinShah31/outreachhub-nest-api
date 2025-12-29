import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { MessageTemplatesService } from './message-templates.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('message-templates')
@UseGuards(JwtAuthGuard)
export class MessageTemplatesController {
  constructor(private service: MessageTemplatesService) {}

  @Get()
  findAll(@GetUser() user: any) {
    return this.service.findAll(user.workspaceId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('editor')
  create(@Body() dto: any, @GetUser() user: any) {
    return this.service.create(dto, user.workspaceId);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('editor')
  update(@Param('id') id: string, @Body() dto: any, @GetUser() user: any) {
    return this.service.update(id, dto, user.workspaceId);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('editor')
  delete(@Param('id') id: string, @GetUser() user: any): Promise<any> {
    return this.service.delete(id, user.workspaceId);
  }
}