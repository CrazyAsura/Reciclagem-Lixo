import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  } 

  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('logout')
  logout(@Body() logoutAuthDto: LogoutAuthDto) {
    return this.authService.logout(logoutAuthDto);
  }

  @Get('profile/:id')
  getProfile(@Param('id') id: string) {
    return this.authService.getProfile(id);
  }

}
