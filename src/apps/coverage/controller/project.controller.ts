import { Crud, CrudController } from '@nestjsx/crud'
import { CodeHouse } from '../entities/code-house.entity'
import { Body, Controller, Get, Query } from '@nestjs/common'
import { ProjectCrudService } from '../service/crud/project.crud.service'
import { Project } from '../entities/project.entity'
import { FindRepoDetailService } from '../service/find-repo-detail.service'
import { RetrieveACoverageForAProjectService } from '../service/retrieve-a-coverage-for-a-project.service'
import {FileContentService} from "../service/file-content.service";

@Crud({
  model: {
    type: CodeHouse,
  },
})
@Controller('project')
export class ProjectController implements CrudController<Project> {
  constructor(
    public service: ProjectCrudService,
    public fileContentService: FileContentService,
    private readonly retrieveACoverageForAProjectService: RetrieveACoverageForAProjectService,
  ) {}

  @Get('')
  listProjects(@Body() triggerDto: any) {
    return this.service.listProjects()
  }

  // 检索一个项目的某一版本的覆盖率对象
  @Get('coverage')
  retrieveACoverageForAProject(@Query() commitDto: any) {
    return this.retrieveACoverageForAProjectService.invoke(commitDto)
  }

  // 检索一个项目的某一版本的某个文件的内容
  @Get('filecontent')
  fileContent(@Query() fileContentDto: any) {
    return this.fileContentService.invoke(fileContentDto)
  }
}
