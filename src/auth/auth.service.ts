import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    console.log(
      'AuthService constructor, JWT_SECRET_KEY:',
      this.configService.get<string>('JWT_SECRET_KEY'),
    );
  }

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByLogin(login);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: { login: string; password: string }) {
    const user = await this.validateUser(loginDto.login, loginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { login: user.login, userId: user.id };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
        expiresIn: '1h',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
        expiresIn: '7d',
      }),
    };
  }
}
