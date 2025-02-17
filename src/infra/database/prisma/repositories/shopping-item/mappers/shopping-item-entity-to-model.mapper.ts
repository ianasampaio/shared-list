import { ShoppingItem } from 'src/modules/shopping-item/entities/shopping-item.entity';

export class ShoppingItemEntityToModelMapper {
  public static map({
    id,
    description,
    status,
    shoppingListId,
    modifiedBy,
    updatedAt,
  }: ShoppingItem) {
    const data = {
      id,
      description,
      status,
      shoppingListId,
      modifiedBy,
      updatedAt,
    };

    return data;
  }
}
