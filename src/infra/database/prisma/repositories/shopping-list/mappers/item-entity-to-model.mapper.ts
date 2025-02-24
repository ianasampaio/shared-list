import { ShoppingListItem } from 'src/modules/shopping-list/entities/shopping-list.entity';

export class ItemEntityToModelMapper {
  public static map({
    id,
    description,
    status,
    modifiedBy,
    updatedAt,
    shoppingListId,
  }: ShoppingListItem) {
    const data = {
      id,
      description,
      status,
      modifiedBy,
      updatedAt,
      shoppingListId,
    };

    return data;
  }
}
