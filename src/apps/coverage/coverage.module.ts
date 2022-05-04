import { Module } from '@nestjs/common'
import { RepoService } from './service/repo.service'
import { RepoController } from './controller/repo.controller'
import { coverageProviders } from './providers/coverage.providers'
import { DatabaseModule } from '../database/database.module'
import { CoverageController } from './controller/coverage.controller'
import { CoverageClientService } from './service/coverage-client.service'

@Module({
  imports: [DatabaseModule],
  controllers: [RepoController, CoverageController],
  providers: [RepoService, CoverageClientService, ...coverageProviders],
})
export class CoverageModule {}
