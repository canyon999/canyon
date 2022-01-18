import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Coverage } from '../../entities/coverage.entity'

@Injectable()
export class CoverageCrudService extends TypeOrmCrudService<Coverage> {
  constructor(@InjectRepository(Coverage, 'DATABASE_CONNECTION') repo) {
    super(repo)
  }
}
