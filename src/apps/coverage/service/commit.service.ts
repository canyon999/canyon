import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Coverage } from '../entities/coverage.entity'
import { User } from '../../user/entities/user.entity'
import { Project } from '../entities/project.entity'
import { CodeHouse } from '../entities/code-house.entity'

@Injectable()
export class CommitService {
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

  async invoke(commitDto: any) {
    const { projectId } = commitDto
    const coverageQuery = await this.coverageRepository.query(
      `SELECT commit_sha, project_id, COUNT(*) num FROM coverage WHERE project_id=? GROUP BY project_id,commit_sha;`,
      [projectId],
    )

    const res = []

    for (let i = 0; i < coverageQuery.length; i++) {
      const projectQuery = await this.projectRepository.query(
        `SELECT * FROM project WHERE id = ?;`,
        coverageQuery[0].project_id,
      )
      res.push({
        projectId: projectQuery[0].id,
        commitSha: coverageQuery[i].commit_sha,
        repoId: projectQuery[0].repo_id,
        codeHouseId: projectQuery[0].code_house_id,
      })
    }

    return res
  }
}
