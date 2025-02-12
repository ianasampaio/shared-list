import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ShoppingList } from 'src/modules/shopping-list/entities/shopping-list.entity';
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

  public async list(): Promise<ShoppingList[]> {
    const shoppingListModels = await this.prismaService.shoppingList.findMany();

    const entities = shoppingListModels.map((shoppingListModel) =>
      ShoppingListModelToEntityMapper.map(shoppingListModel),
    );

    return entities;
  }

  public async findById(id: string): Promise<ShoppingList | null> {
    const shoppingListModel = await this.prismaService.shoppingList.findUnique({
      where: {
        id,
      },
    });

    if (!shoppingListModel) {
      return null;
    }

    return ShoppingListModelToEntityMapper.map(shoppingListModel);
  }

  public async delete(id: string): Promise<void> {
    await this.prismaService.shoppingList.delete({
      where: {
        id,
      },
    });
  }
}
