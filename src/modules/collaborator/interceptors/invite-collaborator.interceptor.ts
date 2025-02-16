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
export class InviteCollaboratorValidationInterceptor
  implements NestInterceptor
{
  constructor(private readonly jwtService: JwtService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const { token } = request?.body;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: env.jwtSecret,
      });

      const user = payload.user;

      const shoppingListId = payload.shoppingListId;

      const action = payload.action;

      if (action !== TokenAction.INVITE_COLLABORATOR) {
        throw new UnauthorizedException();
      }

      request['user'] = user;
      request['shoppingListId'] = shoppingListId;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return next.handle();
  }
}
