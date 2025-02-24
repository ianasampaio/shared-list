import { Injectable } from '@nestjs/common';
import {
  ShoppingList,
  ShoppingListItem,
} from 'src/modules/shopping-list/entities/shopping-list.entity';
import { UserType } from 'src/shared/decorators/active-user.decorator';
import { PrismaService } from '../../prisma.service';
import { ItemEntityToModelMapper } from './mappers/item-entity-to-model.mapper';
import { ItemModelToEntityMapper } from './mappers/item-model-to-entity.mapper';
import { ShoppingListEntityToModelMapper } from './mappers/shopping-list-entity-to-model.mapper';
import { ShoppingListModelToEntityMapper } from './mappers/shopping-list-model-to-entity.mapper';

@Injectable()
export class ShoppingListRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(shoppingList: ShoppingList): Promise<void> {
    const data = ShoppingListEntityToModelMapper.map(shoppingList);

    await this.prismaService.shoppingList.create({
      data,
    });
  }

  public async listShoppingList(userType: UserType): Promise<ShoppingList[]> {
    const shoppingListModels = await this.prismaService.shoppingList.findMany({
      where: {
        OR: [
          { ownerId: userType.id },
          {
            collaborators: {
              some: {
                userId: userType.id,
              },
            },
          },
        ],
      },
      include: {
        items: true,
      },
    });

    const entities = shoppingListModels.map((shoppingListModel) =>
      ShoppingListModelToEntityMapper.map(shoppingListModel),
    );

    return entities;
  }

  public async findShoppingListById(
    userType: UserType,
    id: string,
  ): Promise<ShoppingList | null> {
    const shoppingListModel = await this.prismaService.shoppingList.findUnique({
      where: {
        id,
        OR: [
          { ownerId: userType.id },
          {
            collaborators: {
              some: {
                userId: userType.id,
              },
            },
          },
        ],
      },
      include: {
        items: true,
      },
    });

    if (!shoppingListModel) {
      return null;
    }

    return ShoppingListModelToEntityMapper.map(shoppingListModel);
  }

  public async updateShoppingList(
    userType: UserType,
    shoppingList: ShoppingList,
  ): Promise<void> {
    const data = ShoppingListEntityToModelMapper.map(shoppingList);

    await this.prismaService.shoppingList.update({
      where: {
        id: data.id,
        ownerId: userType.id,
      },
      data: {
        name: data.name,
      },
    });
  }

  public async deleteShoppingList(
    userType: UserType,
    id: string,
  ): Promise<void> {
    await this.prismaService.shoppingList.delete({
      where: {
        id,
        ownerId: userType.id,
      },
    });
  }

  public async findItemById(
    id: string,
    shoppingListId: string,
  ): Promise<ShoppingListItem | null> {
    const itemModel = await this.prismaService.item.findUnique({
      where: {
        id,
        shoppingListId: shoppingListId,
      },
    });

    if (!itemModel) {
      return null;
    }

    return ItemModelToEntityMapper.map(itemModel);
  }

  public async addItem(
    userType: UserType,
    shoppingListItem: ShoppingListItem,
  ): Promise<void> {
    await this.prismaService.shoppingList.update({
      where: {
        id: shoppingListItem.shoppingListId,
        OR: [
          { ownerId: userType.id },
          {
            collaborators: {
              some: {
                userId: userType.id,
              },
            },
          },
        ],
      },
      data: {
        items: {
          create: [
            {
              description: shoppingListItem.description,
              status: shoppingListItem.status,
              modifiedBy: userType.id,
              updatedAt: shoppingListItem.updatedAt,
            },
          ],
        },
      },
    });
  }

  public async updateItem(shoppingListItem: ShoppingListItem): Promise<void> {
    const data = ItemEntityToModelMapper.map(shoppingListItem);

    await this.prismaService.item.update({
      where: {
        id: data.id,
        shoppingListId: data.shoppingListId,
      },
      data,
    });
  }

  public async deleteItem(
    shoppingListId: string,
    itemId: string,
  ): Promise<void> {
    await this.prismaService.item.delete({
      where: {
        id: itemId,
        shoppingListId,
      },
    });
  }
}
