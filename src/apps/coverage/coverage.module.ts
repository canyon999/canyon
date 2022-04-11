import { Module } from '@nestjs/common'
import { CoverageController } from './controller/coverage.controller'
import { coverageProviders } from './providers/coverage.providers'
import { DatabaseModule } from '../database/database.module'
import { userProviders } from '../user/providers/user.providers'
import { CoverageClientService } from './service/coverage-client.service'
import { CodeHouseController } from './controller/code-house.controller'
import { CodeHouseCrudService } from './service/crud/code-house.crud.service'
import { codeHouseProviders } from './providers/code-house.providers'
import { projectProviders } from './providers/project.providers'
import { ProjectCrudService } from './service/crud/project.crud.service'
import { ProjectController } from './controller/project.controller'
import { CoverageCrudService } from './service/crud/coverage.crud.service'
import { CommitService } from './service/commit.service'
import { FindRepoDetailService } from './service/find-repo-detail.service'
import { RetrieveACoverageForAProjectService } from './service/retrieve-a-coverage-for-a-project.service'
import { FileContentService } from './service/file-content.service'
import { RetrieveACommitLogService } from './service/retrieve-a-commit-log.service'

@Module({
  imports: [DatabaseModule],
  controllers: [CoverageController, CodeHouseController, ProjectController],
  providers: [
    // 上报服务
    CoverageClientService,
    // 检索一个项目的一个commit覆盖率信息
    RetrieveACoverageForAProjectService,
    // 获取项目的commit list
    CommitService,
    // 获取仓库详情
    FindRepoDetailService,
    // 获取文件详情
    FileContentService,
    // crud
    CodeHouseCrudService,
    ProjectCrudService,
    CoverageCrudService,
    RetrieveACommitLogService,
    ...coverageProviders,
    ...userProviders,
    ...codeHouseProviders,
    ...projectProviders,
  ],
})
export class CoverageModule {}
