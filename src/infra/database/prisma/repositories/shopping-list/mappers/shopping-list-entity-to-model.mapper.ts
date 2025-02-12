import { ShoppingList } from 'src/modules/shopping-list/entities/shopping-list.entity';

export class ShoppingListEntityToModelMapper {
  public static map({ id, name, userId, createdAt }: ShoppingList) {
    const data = {
      id,
      name,
      userId,
      createdAt,
    };

    return data;
  }
}
