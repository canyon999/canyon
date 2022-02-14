import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Coverage } from '../entities/coverage.entity'
import { mergeCoverage, remapCoverage } from '../common/data-convert'
import { Model } from 'mongoose'
import { CoverageDocument } from '../schema/coverage.schema'
import CanyonUtil from "canyon-util";

@Injectable()
export class RetrieveACoverageForAProjectService {
  constructor(
    @Inject('MONGODB_CONNECTION_CoverageRepository')
    private coverageModel: Model<CoverageDocument>,
    @Inject('DATABASE_CONNECTION_CoverageRepository')
    private coverageRepository: Repository<Coverage>,
  ) {}
  async invoke(params: any) {
    const { commitSha } = params
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

    return CanyonUtil.genTreeSummaryMain(CanyonUtil.mergeCoverage(cov))
  }
}
