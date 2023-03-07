import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto/authentication.dto';
import { Public } from '@/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('login')
  async create(@Body() authenticateDto: authDto) {
    return this.authService.authenticateUser(authenticateDto.username, authenticateDto.password);
  }
}
