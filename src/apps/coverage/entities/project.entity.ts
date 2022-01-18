import { Column, Entity } from 'typeorm'
import { CommonBaseEntity } from '../../../common/base/common-base.entity'

@Entity('project')
export class Project extends CommonBaseEntity {
  @Column({
    name: 'repo_id',
    type: 'varchar',
    default: '',
    comment: 'git项目的id',
  })
  repoId: string

  @Column({
    name: 'code_house_id',
    type: 'int',
    default: 0,
    comment: 'git warehouse',
  })
  codeHouseId: number
}
