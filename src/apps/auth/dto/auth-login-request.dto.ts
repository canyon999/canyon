import { ApiProperty } from '@nestjs/swagger'

export class AuthLoginRequestDto {
  @ApiProperty({
    description: '账号',
    required: true,
  })
  username: string

  @ApiProperty({
    description: '密码',
    required: true,
  })
  password: string
}
