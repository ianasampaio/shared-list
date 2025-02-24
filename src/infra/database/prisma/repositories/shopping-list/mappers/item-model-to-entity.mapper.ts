import { ItemStatus as PrismaItemStatus } from '@prisma/client';
import {
  ItemStatus,
  ShoppingListItem,
} from 'src/modules/shopping-list/entities/shopping-list.entity';

export class ItemModelToEntityMapper {
  public static map({
    id,
    description,
    status,
    modifiedBy,
    updatedAt,
    shoppingListId,
  }: {
    id: string;
    description: string;
    status: PrismaItemStatus;
    modifiedBy: string;
    updatedAt: Date;
    shoppingListId: string;
  }): ShoppingListItem {
    return {
      id,
      description,
      status: ItemStatus[status],
      modifiedBy,
      updatedAt,
      shoppingListId,
    };
  }
}
