import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Public } from '../role/decorator/public.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('myInfo')
  myInfo(@Request() request: { user: { id: number } }) {
    return this.userService.myInfo(request.user.id)
  }

  @Public()
  @Post('auth/trip')
  authTrip(@Body() authTripDto: any) {
    return this.userService.authTrip(authTripDto)
  }
}