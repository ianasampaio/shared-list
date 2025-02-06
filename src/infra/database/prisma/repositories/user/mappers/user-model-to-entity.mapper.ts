import { User } from 'src/modules/auth/entities/user.entity';

export class UserModelToEntityMapper {
  public static map({
    id,
    name,
    email,
    password,
    createdAt,
    updatedAt,
  }: {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }): User {
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
