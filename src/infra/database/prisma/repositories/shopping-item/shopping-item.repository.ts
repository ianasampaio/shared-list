import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ShoppingItem } from 'src/modules/shopping-item/entities/shopping-item.entity';
import { ShoppingItemEntityToModelMapper } from './mappers/shopping-item-entity-to-model.mapper';
import { ShoppingItemModelToEntityMapper } from './mappers/shopping-item-model-to-entity.mapper';

@Injectable()
export class ShoppingItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(shoppingItem: ShoppingItem): Promise<void> {
    const data = ShoppingItemEntityToModelMapper.map(shoppingItem);

    await this.prismaService.shoppingItem.create({
      data,
    });
  }

  public async findById(id: string): Promise<ShoppingItem | null> {
    const shoppingItemModel = await this.prismaService.shoppingItem.findUnique({
      where: {
        id,
      },
    });

    if (!shoppingItemModel) {
      return null;
    }

    return ShoppingItemModelToEntityMapper.map(shoppingItemModel);
  }

  public async update(shoppingItem: ShoppingItem): Promise<void> {
    const data = ShoppingItemEntityToModelMapper.map(shoppingItem);

    await this.prismaService.shoppingItem.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prismaService.shoppingItem.delete({
      where: {
        id,
      },
    });
  }
}
