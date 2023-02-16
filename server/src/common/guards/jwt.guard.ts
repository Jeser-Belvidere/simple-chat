import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { IS_PRIVATE_KEY } from '@/common/decorators/public.decorator';

//TODO: add from .env
const JWT_SECRET = 'process.env.JWT_SECRET';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const isPublic = this.reflector.get<string>(IS_PRIVATE_KEY, context.getHandler());

    if (isPublic) return true;

    if (!req.headers.authorization || typeof req.headers.authorization != 'string')
      throw new BadRequestException();

    const token = req.headers.authorization.split(' ')[1];

    try {
      verify(token, JWT_SECRET);
      return true;
    } catch {
      return false;
    }
  }
}
