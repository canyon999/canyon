import { IsString } from 'class-validator'
import { CodeHouse } from '../entities/code-house.entity'
import { Project } from '../entities/project.entity'

export class CoverageClientDto {
  @IsString()
  instrumentCwd: string

  repoId: any

  codeHouseId: any

  coverage: any

  projectId: number

  @IsString()
  commitSha: string

  codeHouse: CodeHouse

  project: Project
}
