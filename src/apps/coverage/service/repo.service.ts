import { Inject, Injectable } from '@nestjs/common'
import { Between, In, Not, Repository } from 'typeorm'
import { Repo } from '../entities/repo.entity'
import { Coverage } from '../entities/coverage.entity'
import { User } from '../../auth/entities/user.entity'
import axios from 'axios'

@Injectable()
export class RepoService {
  constructor(
    @Inject('DATABASE_CONNECTION_RepoRepository')
    private repoRepository: Repository<Repo>,
    @Inject('DATABASE_CONNECTION_CoverageRepository')
    private coverageRepository: Repository<Coverage>,
    @Inject('user_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async repoList() {
    const token = await this.userRepository
      .findOne({ id: 1 })
      .then((res) => res.thAccessToken)

    const repos = await this.repoRepository.find()

    const res = await Promise.all(
      repos.map((item) => {
        return axios
          .get(`https://gitlab.com/api/v4/projects/${item.repoId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => res.data)
      }),
    )

    return res
  }

  async listCoverageCommit({ repoId }) {
    return this.coverageRepository.find({ projectId:repoId })
  }
}
