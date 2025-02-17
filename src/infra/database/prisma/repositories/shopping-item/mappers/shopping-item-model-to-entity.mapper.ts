import { ShoppingItem } from 'src/modules/shopping-item/entities/shopping-item.entity';

export class ShoppingItemModelToEntityMapper {
  public static map({
    id,
    description,
    status,
    shoppingListId,
    modifiedBy,
    updatedAt,
  }): ShoppingItem {
    return {
      id,
      description,
      status,
      shoppingListId,
      modifiedBy,
      updatedAt,
    };
  }
}
