import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WebSocketAuthMiddleware } from 'src/shared/middlewares/websocket-auth.middleware';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { ShoppingListEventsGateway } from './shopping-list-events.gateway';
import { ShoppingListEventsService } from './shopping-list-events.service';

@Module({
  providers: [
    ShoppingListEventsGateway,
    ShoppingListEventsService,
    ShoppingListService,
    WebSocketAuthMiddleware,
    JwtService,
  ],
})
export class ShoppingListEventsModule {}
