import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignsController {
  constructor(private service: CampaignsService) {}

  @Get()
  findAll(@GetUser() user: any) {
    return this.service.findAll(user.workspaceId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: any) {
    return this.service.findOne(id, user.workspaceId);
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
  delete(@Param('id') id: string, @GetUser() user: any) {
    return this.service.delete(id, user.workspaceId);
  }
}