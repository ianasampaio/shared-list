import { ShoppingList } from 'src/modules/shopping-list/entities/shopping-list.entity';

export class ShoppingListEntityToModelMapper {
  public static map({ id, name, ownerId, createdAt, updatedAt }: ShoppingList) {
    const data = {
      id,
      name,
      ownerId,
      createdAt,
      updatedAt,
    };

    return data;
  }
}
