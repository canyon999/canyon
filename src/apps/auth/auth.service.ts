import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from './user.service'
import axios from 'axios'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject('user_REPOSITORY')
    private userRepository: Repository<User>,
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

  async oauthToken(params) {
    // 1.拿前端传来的code兑换access_token，refresh_token

    console.log(process.env.CUSTOM_ENV)

    let redirect_uri = ''
    let ClientId = ''
    let clientSecret = ''

    if (process.env.CUSTOM_ENV === 'dev') {
      redirect_uri = 'http://127.0.0.1:8000/login'
      ClientId =
        '50c768081026f4da5a0fb5368d36fa5e464d0ea614ed022490ad5771f3c688b3'
      clientSecret =
        'da10f1d30a12021b0c875685177cc0d05d3fc23094c10671414ffebbd1ebd532'
    } else {
      redirect_uri = 'http://canyon-platform-v2.rico.org.cn/login'
      ClientId =
        'c319c62cb9bd2ab6736ffb6b1788bf7c0037bfe99c922f780d18330e2a00f067'
      clientSecret =
        'c4b815bce6661db971409959e582c77b0c4c48f86d0849e652e5d6fe6ebc84be'
    }

    const { refresh_token: thRefreshToken, access_token: thAccessToken } =
      await axios
        .post(
          `https://gitlab.com/oauth/token?client_id=${ClientId}&client_secret=${clientSecret}&code=${params.code}&grant_type=authorization_code&redirect_uri=${redirect_uri}`,
        )
        .then((res) => {
          console.log(res.data, 123)
          return res.data
        })
        .catch((err) => {
          console.log(321)
          // 如果没兑换到就抛异常
          throw new UnauthorizedException()
        })

    // 2.如果成功拿到token，先去gitlab那边校验一下，拿到用户信息
    const {
      username,
      name: nickname,
      avatar_url: avatar,
      email,
      id: thId,
    } = await axios
      .get('https://gitlab.com/api/v4/user', {
        headers: {
          Authorization: `Bearer ${thAccessToken}`,
        },
      })
      .then((resxx) => {
        console.log(resxx.data)
        return resxx.data
      })

    console.log(thRefreshToken, 'thRefreshToken')

    // 3.通过gitlab userId到db中查找
    const u = await this.userRepository.findOne({ thId })

    if (u) {
      await this.userRepository.update(
        { id: u.id },
        {
          thRefreshToken,
          thAccessToken,
          username,
          nickname,
          avatar,
          email,
          password: '123456',
        },
      )
    } else {
      await this.userRepository.insert({
        thRefreshToken,
        thAccessToken,
        username,
        nickname,
        avatar,
        email,
        thId,
        password: '123456',
      })
    }
    // 3.登陆逻辑
    const zaicha = await this.userRepository.findOne({ thId })
    console.log(zaicha, 'zaicha')
    return this.login({
      username: zaicha.username,
      id: zaicha.id,
      role: zaicha.role,
    })
  }

  async getUserinfo({ userId }) {
    return this.userRepository.findOne({ id: userId })
  }
}
