import { Injectable } from '@nestjs/common';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Server, Socket } from 'socket.io';
import { CreateItemDto } from '../shopping-list/dto/create-item.dto';
import { UpdateItemDto } from '../shopping-list/dto/update-item.dto';

@Injectable()
export class ShoppingListEventsService {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  async joinList(server: Server, client: Socket, shoppingListId: string) {
    if (!shoppingListId) {
      client.emit('error', { message: 'Required data not provided' });
      return;
    }

    client.join(shoppingListId);

    const userType = client.data.user;

    const currentList = await this.shoppingListService.getShoppingListById(
      userType,
      shoppingListId,
    );

    client.emit('syncList', currentList);
  }

  async addItem(
    server: Server,
    client: Socket,
    shoppingListId: string,
    createItemDto: CreateItemDto,
  ) {
    const userType = client.data.user;

    const updatedItemList = await this.shoppingListService.addItem(
      userType,
      shoppingListId,
      createItemDto,
    );

    server.to(shoppingListId).emit('itemAdded', updatedItemList);
  }

  async updateItem(
    server: Server,
    client: Socket,
    shoppingListId: string,
    itemId: string,
    updateItemDto: UpdateItemDto,
  ) {
    const userType = client.data.user.userType;

    const updatedItem = await this.shoppingListService.updateItem(
      userType,
      shoppingListId,
      itemId,
      updateItemDto,
    );

    server.to(shoppingListId).emit('itemUpdated', updatedItem);
  }

  async deleteItem(
    server: Server,
    client: Socket,
    shoppingListId: string,
    itemId: string,
  ) {
    const userType = client.data.user.userType;

    const updatedItemList = await this.shoppingListService.deleteItem(
      userType,
      shoppingListId,
      itemId,
    );

    server.to(shoppingListId).emit('itemDeleted', updatedItemList);
  }
}
