import { Collaborator } from 'src/modules/collaborator/entities/collaborator.entity';

export class CollaboratorModelToEntity {
  public static map({
    id,
    name,
    userId,
    shoppingListId,
    createdAt,
  }): Collaborator {
    return {
      id,
      name,
      userId,
      shoppingListId,
      createdAt,
    };
  }
}
