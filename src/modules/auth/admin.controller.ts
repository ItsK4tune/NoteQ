import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from 'src/decorators/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthenDTO } from './dtos/auth.dto';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('auth')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/register-admin')
  async register(@Body() { username, password }: AuthenDTO) {
    await this.adminService.register({ username, password });
    return { message: 'Register successful' };
  }

  @Delete('/delete-account')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async deleteAccount(@Body() account_id: number) {
    await this.adminService.deleteAccount(account_id);
    return { message: 'Delete user successful' };
  }
}
