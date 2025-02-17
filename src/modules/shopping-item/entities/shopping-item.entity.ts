export enum ShoppingItemStatus {
  PENDING = 'PENDING',
  PURCHASED = 'PURCHASED',
}

export class ShoppingItem {
  id: string;
  description: string;
  status: ShoppingItemStatus;
  shoppingListId: string;
  modifiedBy: string;
  updatedAt: Date;
}
