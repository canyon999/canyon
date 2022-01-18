import { Column, Entity } from 'typeorm'
import { CommonBaseEntity } from '../../../common/base/common-base.entity'

@Entity('code_house')
export class CodeHouse extends CommonBaseEntity {
  @Column({
    name: 'api_version',
    type: 'varchar',
    default: '',
    comment: 'git仓库的api版本',
  })
  apiVersion: string
  @Column({
    name: 'git_url',
    type: 'varchar',
    default: '',
    comment: 'git仓库的地址',
  })
  gitUrl: string

  @Column({
    name: 'token',
    type: 'varchar',
    default: '',
    comment: 'git拉代码鉴权的token',
  })
  token: string
}
