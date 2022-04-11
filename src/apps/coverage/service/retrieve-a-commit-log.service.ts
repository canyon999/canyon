import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Coverage } from '../entities/coverage.entity'
import { User } from '../../user/entities/user.entity'
import { Project } from '../entities/project.entity'
import { CodeHouse } from '../entities/code-house.entity'

@Injectable()
export class RetrieveACommitLogService {
  constructor(
    @Inject('DATABASE_CONNECTION_CoverageRepository')
    private coverageRepository: Repository<Coverage>,
    @Inject('user_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('DATABASE_CONNECTION_ProjectRepository')
    private projectRepository: Repository<Project>,
    @Inject('DATABASE_CONNECTION_CodeHouseRepository')
    private codeHouseRepository: Repository<CodeHouse>,
  ) {}

  async invoke(params: any) {
    // 查询语句
    const queryBuilder = this.coverageRepository.createQueryBuilder('coverage')
    const coverage = await queryBuilder
      .where('coverage.commit_sha = :commitSha', {
        commitSha: params.commitSha,
      })
      .leftJoinAndSelect(User, 'user', 'user.id = coverage.reporter')
      .select([
        'coverage.id as coverageId',
        'coverage.commitSha as commitSha',
        'coverage.projectId as projectId',
        'coverage.instrumentCwd as instrumentCwd',
        'coverage.createdAt as createdAt',
        'user.username as reporterUsername',
      ])
      // .select([`user.username as username`])
      .getRawMany()

    return coverage
  }
}
