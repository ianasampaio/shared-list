import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketAuthMiddleware } from 'src/shared/middlewares/websocket-auth.middleware';
import { ShoppingListEventsService } from './shopping-list-events.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ShoppingListEventsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly shoppingListEventsService: ShoppingListEventsService,
    private readonly webSocketAuthMiddleware: WebSocketAuthMiddleware,
  ) {}

  afterInit(server: Server) {
    server.use((socket, next) =>
      this.webSocketAuthMiddleware.authenticate(socket, next),
    );
  }

  @SubscribeMessage('joinShoppingList')
  async handleJoinList(
    @MessageBody() data: { shoppingListId: string },
    @ConnectedSocket() client: Socket,
  ) {
    await this.shoppingListEventsService.joinList(
      this.server,
      client,
      data.shoppingListId,
    );
  }

  @SubscribeMessage('addItem')
  async handleAddItem(
    @MessageBody() data: { shoppingListId: string; createItemDto: any },
    @ConnectedSocket() client: Socket,
  ) {
    await this.shoppingListEventsService.addItem(
      this.server,
      client,
      data.shoppingListId,
      data.createItemDto,
    );
  }

  @SubscribeMessage('updateItem')
  async handleUpdateItem(
    @MessageBody()
    data: { shoppingListId: string; itemId: string; updateItemDto: any },
    @ConnectedSocket() client: Socket,
  ) {
    await this.shoppingListEventsService.updateItem(
      this.server,
      client,
      data.shoppingListId,
      data.itemId,
      data.updateItemDto,
    );
  }

  @SubscribeMessage('deleteItem')
  async handleDeleteItem(
    @MessageBody() data: { shoppingListId: string; itemId: string },
    @ConnectedSocket() client: Socket,
  ) {
    await this.shoppingListEventsService.deleteItem(
      this.server,
      client,
      data.shoppingListId,
      data.itemId,
    );
  }
}
