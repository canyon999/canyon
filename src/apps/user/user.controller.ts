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
  @Post('checkEmailType')
  checkEmailType(@Body() checkEmailTypeDto: any) {
    return this.userService.checkEmailType(checkEmailTypeDto)
  }

  @Public()
  @Post('sendTemporaryPassword')
  sendTemporaryPassword(@Body() sendTemporaryPasswordDto: any) {
    return this.userService.sendTemporaryPassword(sendTemporaryPasswordDto)
  }

  @Public()
  @Post('getActivatedAccountPassword')
  getActivatedAccountPassword(@Body() getActivatedAccountPasswordDto: any) {
    return this.userService.getActivatedAccountPassword(
      getActivatedAccountPasswordDto,
    )
  }
}
