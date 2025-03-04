import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'src/shared/env';
import { Socket } from 'socket.io';

@Injectable()
export class WebSocketAuthMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async authenticate(socket: Socket, next: (err?: any) => void) {
    const token = socket.handshake.headers.authorization?.replace(
      'Bearer ',
      '',
    );

    if (!token) {
      return next(new UnauthorizedException('Token ausente'));
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: env.jwtSecret,
      });
      socket.data.user = payload.user;
      next();
    } catch (error) {
      return next(new UnauthorizedException('Token inválido'));
    }
  }
}
