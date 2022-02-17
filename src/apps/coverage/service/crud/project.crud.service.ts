import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'

import { Project } from '../../entities/project.entity'
import { FindRepoDetailService } from '../find-repo-detail.service'
import { Repository } from 'typeorm'
import { CodeHouse } from '../../entities/code-house.entity'

@Injectable()
export class ProjectCrudService extends TypeOrmCrudService<Project> {
  constructor(
    @InjectRepository(Project, 'DATABASE_CONNECTION') repo,
    public findRepoDetailService: FindRepoDetailService,
    @Inject('DATABASE_CONNECTION_CodeHouseRepository')
    private codeHouseRepository: Repository<CodeHouse>,
  ) {
    super(repo)
  }
  async listProjects(): Promise<any> {
    const projects = await this.repo.find({})
    for (let i = 0; i < projects.length; i++) {
      const { codeHouseId, repoId } = projects[i]
      projects[i]['projectRepoDetail'] =
        await this.findRepoDetailService.invoke({
          codeHouseId,
          repoId,
        })

      projects[i]['codeHouseApiVersion'] = (
        await this.codeHouseRepository.findOne({ id: projects[0].codeHouseId })
      ).apiVersion
    }
    return projects
  }
}
