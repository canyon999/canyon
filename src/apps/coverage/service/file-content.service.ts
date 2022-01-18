import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Coverage } from '../entities/coverage.entity'
import { User } from '../../user/entities/user.entity'
import { Project } from '../entities/project.entity'
import { CodeHouse } from '../entities/code-house.entity'
import axios from 'axios'

@Injectable()
export class FileContentService {
  constructor(
    @Inject('DATABASE_CONNECTION_CoverageRepository')
    private coverageRepository: Repository<Coverage>,
    @Inject('user_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('DATABASE_CONNECTION_ProjectRepository')
    private projectRepository: Repository<Project>,
    @Inject('DATABASE_CONNECTION_CodeHouseRepository')
    private codeHouseRepository: Repository<CodeHouse>,
  ) {}

  async invoke(params: any) {
    const { filePath, commitSha, projectId } = params
    const projectRepositoryFindOneResult = await this.projectRepository.findOne(
      { id: projectId },
    )
    const { repoId, codeHouseId } = projectRepositoryFindOneResult
    const codeHouseRepositoryFindOneResult =
      await this.codeHouseRepository.findOne({ id: codeHouseId })
    const { token, gitUrl } = codeHouseRepositoryFindOneResult

    const res = await axios
      .get(
        `${gitUrl}/api/v4/projects/${repoId}/repository/files/${encodeURIComponent(
          decodeURIComponent(filePath),
        )}`,
        {
          params: {
            ref: commitSha,
          },
          headers: {
            'PRIVATE-TOKEN': token,
          },
        },
      )
      .then((res) => {
        return {
          ...res.data,
        }
      })
      .catch((err) => {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: '没有找到对应文件',
          },
          HttpStatus.BAD_REQUEST,
        )
      })
    return res
  }
}
