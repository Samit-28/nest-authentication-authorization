/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as config from '@nestjs/config';
import { PrismaService } from '../../common/prisma/prisma.service';
import { HashingService } from '../hashing.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const hashedPassword = await this.hashingService.hash(signUpDto.password);
      const user = await this.prisma.user.create({
        data: {
          name: signUpDto.name,
          phone: signUpDto.phone,
          email: signUpDto.email,
          password: hashedPassword,
        },
      });
      return user;
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ConflictException(
          `User with email ${signUpDto.email} already exists`,
        );
      }
      throw new Error(`Error signing up user: ${err.name}`);
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: signInDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found with this email');
    }

    const isPasswordValid = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        name: user.name,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
    console.log('Generated Access Token:', accessToken);
    const { id, password, createdAt, ...safeUser } = user;
    return {
      accessToken,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}
