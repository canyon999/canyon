import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    console.log(
      'AuthService.validateUser 第二步：拿到数据去user服务里校验信息',
      username,
      password,
    )
    const user = await this.userService.passwordLogin({ username, password })
    if (user) {
      return user
    } else {
      return null
    }
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      id: Number(user.id),
      roles: user.role.split(','),
    }
    console.log('AuthService.login 第三步：存储信息', payload)
    return {
      token: this.jwtService.sign(payload),
    }
  }
}
