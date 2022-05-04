import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common'
import { RepoService } from '../service/repo.service'

@Controller('')
export class RepoController {
  constructor(private readonly reposService: RepoService) {}

  //获取个人所有的项目
  // 1.自己所在的项目
  //2.哪些激活了的
  @Get('repo')
  repoList(@Query() query: any) {
    return this.reposService.repoList()
  }

  @Get('repo/:repoId/commitSha/:commitSha')
  listCoverageCommit(@Query() query: any, @Param() param) {
    console.log(param, 'param')
    return this.reposService.listCoverageCommit({ repoId: param.repoId })
  }
}
