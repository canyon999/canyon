import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Coverage } from '../entities/coverage.entity'
import { mergeCoverage, remapCoverage } from '../common/data-convert'
import { Model } from 'mongoose'
import { CoverageDocument } from '../schema/coverage.schema'
import CanyonUtil from 'canyon-util'
import { InjectRepository } from '@nestjs/typeorm'
import { Project } from '../entities/project.entity'
import { FindRepoDetailService } from './find-repo-detail.service'

@Injectable()
export class RetrieveACoverageForAProjectService {
  constructor(
    @Inject('MONGODB_CONNECTION_CoverageRepository')
    private coverageModel: Model<CoverageDocument>,
    @Inject('DATABASE_CONNECTION_CoverageRepository')
    private coverageRepository: Repository<Coverage>,
    @InjectRepository(Project, 'DATABASE_CONNECTION') repo,
    public findRepoDetailService: FindRepoDetailService,
    @Inject('DATABASE_CONNECTION_ProjectRepository')
    private projectRepository: Repository<Project>,
  ) {}
  async invoke(params: any) {
    const { commitSha, projectId } = params

    const { codeHouseId, repoId } = await this.projectRepository.findOne({
      id: projectId,
    })

    const fd = await this.findRepoDetailService.invoke({
      codeHouseId,
      repoId,
    })

    const coverageRepositoryFindResult = await this.coverageRepository.find({
      commitSha: commitSha,
    })
    const cov = []

    for (let i = 0; i < coverageRepositoryFindResult.length; i++) {
      const c = await this.coverageModel.findOne({
        _id: coverageRepositoryFindResult[i].relationId,
      })
      cov.push(JSON.parse(c.coverage))
    }

    return {
      fd,
      treeSummary: CanyonUtil.genTreeSummaryMain(CanyonUtil.mergeCoverage(cov)),
    }
  }
}
