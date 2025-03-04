import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'src/shared/env';
import { extractTokenFromHeader } from 'src/shared/extract-token';
import { Observable } from 'rxjs';

@Injectable()
export class AuthValidationInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: env.jwtSecret,
      });

      const user = payload.user;
      console.log(user);

      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return next.handle();
  }
}
