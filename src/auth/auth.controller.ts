import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Res,
  Req,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const userData = await this.authService.login(req.user);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @Post('/register')
  async register(
    @Body() createUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res,
  ) {
    const userData = await this.authService.register(createUserDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res, @Req() req) {
    const { refreshToken } = req.cookies;
    const token = await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return token;
  }

  @Get('refresh')
  async refresh(@Res({ passthrough: true }) res, @Req() req) {
    const { refreshToken } = req.cookies;
    const userData = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}