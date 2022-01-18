import { Connection } from 'typeorm'
import { Connection as MongoConnection } from 'mongoose'
import { Coverage } from '../entities/coverage.entity'
import { CoverageSchema } from '../schema/coverage.schema'
export const coverageProviders = [
  {
    provide: 'DATABASE_CONNECTION_CoverageRepository',
    useFactory: (connection: Connection) => connection.getRepository(Coverage),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'MONGODB_CONNECTION_CoverageRepository',
    useFactory: (connection: MongoConnection) =>
      connection.model(
        'canyon_coverage_model',
        CoverageSchema,
        'canyon_coverage',
      ),
    inject: ['MONGODB_CONNECTION'],
  },
]
