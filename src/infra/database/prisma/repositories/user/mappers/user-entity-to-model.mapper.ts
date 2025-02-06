import { User } from 'src/modules/auth/entities/user.entity';

export class UserEntityToModelMapper {
  public static map({ id, name, email, password, createdAt, updatedAt }: User) {
    return {
      id,
      name,
      email,
      password,
      createdAt,
      updatedAt,
    };
  }
}
