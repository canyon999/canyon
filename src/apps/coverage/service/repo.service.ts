import { Inject, Injectable } from '@nestjs/common'
import { Between, In, Not, Repository } from 'typeorm'
import { Repo } from '../entities/repo.entity'
import { Coverage } from '../entities/coverage.entity'
import { User } from '../../auth/entities/user.entity'
import axios from 'axios'
import { GitlabService } from '../../th/service/gitlab.service'

@Injectable()
export class RepoService {
  constructor(
    @Inject('DATABASE_CONNECTION_RepoRepository')
    private repoRepository: Repository<Repo>,
    @Inject('DATABASE_CONNECTION_CoverageRepository')
    private coverageRepository: Repository<Coverage>,
    @Inject('user_REPOSITORY')
    private userRepository: Repository<User>,
    private readonly gitlabService: GitlabService,
  ) {}
  async repoList({ currentUser }) {
    const repos = await this.repoRepository.find()
    return this.gitlabService.repoList({ currentUser: currentUser, repos })
  }

  async listCoverageCommit({ currentUser, thRepoId }) {
    const retrieveARepo = await this.gitlabService.retrieveARepo({
      currentUser: currentUser,
      thRepoId: thRepoId,
    })
    const repo = await this.repoRepository.findOne({
      thRepoId: retrieveARepo.id,
    })
    return this.coverageRepository.find({ repoId: repo.id })
  }
}
