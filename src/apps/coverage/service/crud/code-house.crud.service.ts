import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'

import { CodeHouse } from '../../entities/code-house.entity'

@Injectable()
export class CodeHouseCrudService extends TypeOrmCrudService<CodeHouse> {
  constructor(@InjectRepository(CodeHouse, 'DATABASE_CONNECTION') repo) {
    super(repo)
  }
}
