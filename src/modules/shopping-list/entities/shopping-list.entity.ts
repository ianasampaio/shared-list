export enum ItemStatus {
  PENDING = 'PENDING',
  PURCHASED = 'PURCHASED',
}

export class ShoppingListItem {
  id: string;
  description: string;
  status: ItemStatus;
  modifiedBy: string;
  updatedAt: Date;
  shoppingListId: string;
}

export class ShoppingList {
  id: string;
  name: string;
  ownerId: string;
  items?: ShoppingListItem[];
  collaborators?: {
    name: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
