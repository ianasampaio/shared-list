import { Collaborator } from 'src/modules/collaborator/entities/collaborator.entity';

export class CollaboratorEntityToModelMapper {
  public static map({
    id,
    name,
    userId,
    shoppingListId,
    createdAt,
  }: Collaborator) {
    const data = {
      id,
      name,
      userId,
      shoppingListId,
      createdAt,
    };

    return data;
  }
}
