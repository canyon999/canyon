import { Column, Entity } from 'typeorm'
import { CommonBaseEntity } from '../../../common/base/common-base.entity'

@Entity('repo')
export class Repo extends CommonBaseEntity {
  @Column({
    name: 'repo_id',
    type: 'varchar',
    default: '',
    comment: 'git项目的id',
  })
  repoId: string
}
