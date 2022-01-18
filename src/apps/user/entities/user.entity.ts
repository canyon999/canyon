import { Column, Entity } from 'typeorm'
import { CommonBaseEntity } from '../../../common/base/common-base.entity'

@Entity('user')
export class User extends CommonBaseEntity {
  @Column({
    type: 'varchar',
    default: '',
    comment: '用户名',
    name: 'username',
  })
  username: string

  @Column({
    type: 'varchar',
    default: '',
    comment: '邮箱',
  })
  email: string

  @Column({
    type: 'varchar',
    default: '',
    comment: '密码',
  })
  password: string

  @Column({
    type: 'varchar',
    default: '',
    comment: 'role',
  })
  role: string
}
