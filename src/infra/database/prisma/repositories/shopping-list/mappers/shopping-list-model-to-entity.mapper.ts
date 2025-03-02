import { ItemStatus as PrismaItemStatus } from '@prisma/client';
import { ShoppingList } from 'src/modules/shopping-list/entities/shopping-list.entity';
import { ItemModelToEntityMapper } from './item-model-to-entity.mapper';

export class ShoppingListModelToEntityMapper {
  public static map({
    id,
    name,
    ownerId,
    createdAt,
    updatedAt,
    items,
  }: {
    id: string;
    name: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
    items?: {
      id: string;
      description: string;
      status: PrismaItemStatus;
      modifiedBy: string;
      updatedAt: Date;
    }[];
  }): ShoppingList {
    return {
      id,
      name,
      ownerId,
      createdAt,
      updatedAt,
      items: items?.map(ItemModelToEntityMapper.map),
    };
  }
}
