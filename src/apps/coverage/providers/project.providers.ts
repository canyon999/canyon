import { Connection } from 'typeorm'
import { Project } from '../entities/project.entity'

export const projectProviders = [
  {
    provide: 'DATABASE_CONNECTION_ProjectRepository',
    useFactory: (connection: Connection) => connection.getRepository(Project),
    inject: ['DATABASE_CONNECTION'],
  },
]
