import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ENV_ENUM } from '@/common/types/env.types';
import { UsersService } from '@users/users.service';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private UsersService: UsersService, private readonly configService: ConfigService) {}

  async authenticateUser(username: string, password: string) {
    const user = await this.UsersService.findOne({ username });
    const { hash } = user;
    const isMatch = await bcrypt.compare(password, hash);

    if (!isMatch) throw new UnauthorizedException('Password is not correct');

    return { accessToken: this.signAccessToken(user) };
  }

  signAccessToken(user: any) {
    const { username, id } = user;
    const JWT_SECRET = this.configService.get<string>(ENV_ENUM.JWT_SECRET) as string;
    const EXPIRES_IN = this.configService.get<string>(ENV_ENUM.JWT_EXPIRES_IN) as string;

    const payload = { username: username, id: id };

    return sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
  }
}
