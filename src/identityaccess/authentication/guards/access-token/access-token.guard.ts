/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as config from '@nestjs/config';
import jwtConfig from '../../../config/jwt.config';
import { REQUEST_USER_KEY } from '../../../../common/constants/identityaccess.constant';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);
    if (!token)
      throw new UnauthorizedException('Access token not found in request');
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_USER_KEY] = payload;
      console.log('Token:', token);
      console.log('Payload:', payload);
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
    return true;
  }

  private extractToken(request: Request): string | null {
    if (!request) return null;

    const cookies = (request.cookies as Record<string, string>) ?? {};
    const token =
      typeof cookies.accessToken === 'string' ? cookies.accessToken : null;

    if (token) return token;

    // Fallback: Authorization header
    const authHeader = request.headers.authorization?.split(' ') ?? [];
    if (authHeader.length === 2 && authHeader[0] === 'Bearer') {
      return authHeader[1];
    }

    return null;
  }
}
