import { NestFactory } from '@nestjs/core'
import * as bodyParser from 'body-parser'
import { NestExpressApplication } from '@nestjs/platform-express'
import { prepareInit } from './utils/prepareInit'

async function bootstrap() {
  prepareInit()
  const { AppModule } = await import('./app.module')
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  app.enableCors()
  await app.listen(8080)
}
bootstrap()
