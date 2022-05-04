import { Controller, Get, Post, Body, Query, Request } from '@nestjs/common'
import { RepoService } from '../service/repo.service'
import { CoverageClientService } from '../service/coverage-client.service'

@Controller('coverage')
export class CoverageController {
  constructor(private readonly coverageClientService: CoverageClientService) {}

  @Post('client')
  create(
    @Request() request: { user: { id: number } },
    @Body() coverageClientDto: any,
  ) {
    return this.coverageClientService.invoke(1, coverageClientDto)
  }
}
