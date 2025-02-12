import { ShoppingList } from 'src/modules/shopping-list/entities/shopping-list.entity';

export class ShoppingListModelToEntityMapper {
  public static map({ id, name, userId, createdAt }): ShoppingList {
    return {
      id,
      name,
      userId,
      createdAt,
    };
  }
}
