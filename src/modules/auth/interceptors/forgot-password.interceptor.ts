import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { TokenAction } from 'src/infra/mail/mail.dto';
import { env } from 'src/shared/env';

@Injectable()
export class ForgotPasswordValidationInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const { token, newPassword, newPasswordConfirmation } = request?.body;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: env.jwtSecret,
      });

      const user = payload.user;

      const action = payload.action;

      if (action !== TokenAction.FORGOT_PASSWORD) {
        throw new UnauthorizedException();
      }

      if (newPassword !== newPasswordConfirmation) {
        throw new BadRequestException('passwords do not match');
      }

      request['user'] = user;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }

    return next.handle();
  }
}
