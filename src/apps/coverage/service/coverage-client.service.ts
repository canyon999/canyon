import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Coverage } from '../entities/coverage.entity'
import { User } from '../../auth/entities/user.entity'
import { formatCoverage } from '../../../utils'
import { CoverageDocument } from '../schema/coverage.schema'
import { Model } from 'mongoose'
import CanyonUtil from 'canyon-util'
import { Repo } from '../entities/repo.entity'
import axios from 'axios'

/**
 * 上传覆盖率，十分重要的服务
 */

// 改版完以后，不能在没有创建之前上传覆盖率，并且上传完覆盖率以后需要手动触发生成报告

@Injectable()
export class CoverageClientService {
  constructor(
    @Inject('MONGODB_CONNECTION_CoverageRepository')
    private coverageModel: Model<CoverageDocument>,
    @Inject('DATABASE_CONNECTION_CoverageRepository')
    private coverageRepository: Repository<Coverage>,
    @Inject('user_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('DATABASE_CONNECTION_RepoRepository')
    private repoRepository: Repository<Repo>,
  ) {}

  async invoke(currentUser, coverageClientDto: any) {
    const coverageReport = await this.dataFormatAndCheck(coverageClientDto)
    const { coverage, commitSha, repoId, instrumentCwd } = coverageReport
    // 每次上报的覆盖率，本体存在mongodb，覆盖率信息存在mysql，通过relationId关联
    const coverageModelInsertManyResult = await this.coverageModel.create({
      coverage: JSON.stringify(coverage),
    })
    const cov = {
      commitSha,
      reporter: currentUser,
      repoId,
      instrumentCwd,
      relationId: String(coverageModelInsertManyResult._id),
    }
    console.log(cov, 'cov')
    const coverageRepositoryInsertResult = await this.coverageRepository.insert(
      cov,
    )
    return { coverageRepositoryInsertResult, coverageModelInsertManyResult }
  }

  async dataFormatAndCheck(data: any): Promise<any> {
    data = this.regularData(data)
    const cov: any = {}
    const instrumentCwd = data.instrumentCwd
    const coverage = data.coverage
    const noPass = []
    for (const coverageKey in coverage) {
      if (coverageKey.includes(instrumentCwd)) {
      } else {
        noPass.push(coverageKey)
      }
    }
    if (noPass.length > 0) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'coverage对象与canyon.processCwd不匹配',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    console.log(1, data.thRepoId)
    // 检查是否有项目在表里
    let checkIsHasProject = await this.repoRepository.findOne({
      thRepoId: String(data.thRepoId),
    })

    if (!checkIsHasProject) {
      // 如果不在插入以后再查
      await this.repoRepository.insert([
        {
          thRepoId: String(data.thRepoId),
        },
      ])
      checkIsHasProject = await this.repoRepository.findOne({
        thRepoId: String(data.thRepoId),
      })
    }

    // 3.修改覆盖率路径

    // 考虑到会出现大数的情况
    // CanyonUtil.formatReportObject上报时就开启源码回溯
    cov.coverage = await CanyonUtil.formatReportObject({
      coverage,
      instrumentCwd,
    }).then((res) => res.coverage)
    cov.instrumentCwd = data.instrumentCwd
    cov.thRepoId = checkIsHasProject.thRepoId
    cov.repoId = checkIsHasProject.id
    cov.commitSha = data.commitSha
    cov.project = checkIsHasProject
    console.log(cov, 'covcovcov')
    return cov
  }

  regularData(data: any) {
    const obj = {}
    const { coverage } = data
    // 针对windows电脑，把反斜杠替换成正斜杠
    // 做数据过滤，去除 \u0000 字符
    for (const coverageKey in coverage) {
      if (!coverageKey.includes('\u0000')) {
        obj[coverageKey] = coverage[coverageKey]
      }
    }
    return {
      ...data,
      coverage: obj,
      thRepoId: data.thRepoId || data.repoId || data.projectId,
    }
  }

  async retrieveACoverageForAProjectService(params) {
    const { commitSha } = params

    const token = await this.userRepository
      .findOne({ id: 1 })
      .then((res) => res.thAccessToken)

    const fd = await axios
      .get(
        `https://gitlab.com/api/v4/projects/${encodeURIComponent(
          'canyon999/canyon-demo2',
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        return res.data
      })


    console.log(fd,'fd')

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
