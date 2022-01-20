import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common'
import { LocalAuthGuard } from './apps/auth/guards/local-auth.guard'
import { AuthService } from './apps/auth/auth.service'
import { AuthLoginRequestDto } from './apps/auth/dto/auth-login-request.dto'
import { Public } from './apps/role/decorator/public.decorator'

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @Get('/vi/health')
  @Public()
  health(): string {
    return '365ms'
  }
  @Get('/v')
  @Public()
  v(): any {
    return { v: 'v1.2.3' }
  }
  // 颁发token的接口，其他接口要用，直接用axios请求
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req, @Body() authLoginDto: AuthLoginRequestDto) {
    return this.authService.login(req.user)
  }
}
