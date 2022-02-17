import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CoverageClientDto } from '../dto/coverage-client.dto'
import { CoverageClientService } from '../service/coverage-client.service'
import { Crud, CrudController } from '@nestjsx/crud'
import { Coverage } from '../entities/coverage.entity'
import { CoverageCrudService } from '../service/crud/coverage.crud.service'
import { CommitService } from '../service/commit.service'

@UsePipes(new ValidationPipe())
@Controller('coverage')
@Crud({
  model: {
    type: Coverage,
  },
})
export class CoverageController implements CrudController<Coverage> {
  constructor(
    private readonly coverageClientService: CoverageClientService,
    public service: CoverageCrudService,
    public commitService: CommitService,
  ) {}
  @Post('client')
  create(
    @Request() request: { user: { id: number } },
    @Body() coverageClientDto: CoverageClientDto,
  ) {
    return this.coverageClientService.invoke(request.user.id, coverageClientDto)
  }

  @Get('commit')
  commit(@Query() commitDto: any) {
    return this.commitService.invoke(commitDto)
  }
}
