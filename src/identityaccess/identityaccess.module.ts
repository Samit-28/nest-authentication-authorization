import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { HashingService } from './hashing.service';
import { BcryptService } from './bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { PrismaModule } from '../common/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [
    AuthenticationService,
    { provide: HashingService, useClass: BcryptService },
    // { provide: APP_GUARD, useClass: AccessTokenGuard },
  ],
  controllers: [AuthenticationController],
})
export class IdentityaccessModule {}
