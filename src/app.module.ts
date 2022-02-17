import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UserModule } from './apps/user/user.module'
import { AuthModule } from './apps/auth/auth.module'
import { CoverageModule } from './apps/coverage/coverage.module'
import { JwtAuthGuard } from './apps/auth/guards/jwt-auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './apps/role/guard/roles.guard'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    UserModule,
    AuthModule,
    CoverageModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
