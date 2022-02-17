import { Connection } from 'typeorm'
import { CodeHouse } from '../entities/code-house.entity'

export const codeHouseProviders = [
  {
    provide: 'DATABASE_CONNECTION_CodeHouseRepository',
    useFactory: (connection: Connection) => connection.getRepository(CodeHouse),
    inject: ['DATABASE_CONNECTION'],
  },
]
