import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '@/common/decorators/public.decorator';
import { ENV_ENUM } from '../types/env.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  private reflector = new Reflector();
  private readonly configService = new ConfigService();

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const isPublic = this.reflector.get<string>(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) return true;

    if (!req.headers.authorization || typeof req.headers.authorization != 'string')
      throw new BadRequestException();

    const token = req.headers.authorization.split(' ')[1];

    const SECRET = this.configService.get<string>(ENV_ENUM.JWT_SECRET) as string;

    try {
      verify(token, SECRET);
      return true;
    } catch {
      return false;
    }
  }
}
