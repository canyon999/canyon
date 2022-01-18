import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Coverage } from '../entities/coverage.entity'
import { User } from '../../user/entities/user.entity'
import { Project } from '../entities/project.entity'
import { CodeHouse } from '../entities/code-house.entity'
import { configLog } from '../../../utils'
import axios from 'axios'

@Injectable()
export class FindRepoDetailService {
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

  async invoke(commitDto: any) {
    const { codeHouseId, repoId } = commitDto
    const { token, gitUrl } = await this.codeHouseRepository.findOne({
      id: codeHouseId,
    })
    let res = {}
    try {
      res = (
        await axios({
          url: `${gitUrl}/api/v4/projects/${repoId}`,
          headers: {
            'PRIVATE-TOKEN': token,
          },
        })
      ).data
    } catch (e) {}

    return res
  }
}
