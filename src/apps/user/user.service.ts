import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import axios from 'axios'

@Injectable()
export class UserService {
  constructor(
    @Inject('user_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  myInfo(currentUser: number) {
    return this.userRepository.findOne({ id: currentUser })
  }

  async authTrip({ email }) {
    const findOneByEmail = await this.userRepository.findOne({ email: email })
    let token = ''
    if (findOneByEmail) {
      token = await axios
        .post('http://127.0.0.1:8080/auth/login', {
          username: findOneByEmail.username,
          password: findOneByEmail.password,
        })
        .then((res) => res.data.token)
    } else {
      await this.userRepository.insert({
        email: email,
        password: email,
        username: email,
      })
      token = await axios
        .post('http://127.0.0.1:8080/auth/login', {
          username: email,
          password: email,
        })
        .then((res) => res.data.token)
    }
    if (token === '') {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: '登陆失败',
        },
        HttpStatus.FORBIDDEN,
      )
    }
    return { token: token }
  }

  // 登陆接口！！！
  async passwordLogin({ username, password }) {
    const user = await this.userRepository.find({ password, username })
    if (user.length > 0) {
      return user[0]
    } else {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: '账号密码错误',
        },
        HttpStatus.FORBIDDEN,
      )
    }
  }
}
