import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User } from 'src/modules/auth/entities/user.entity';
import { UserEntityToModelMapper } from './mappers/user-entity-to-model.mapper';
import { UserModelToEntityMapper } from './mappers/user-model-to-entity.mapper';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(user: User): Promise<User> {
    const data = UserEntityToModelMapper.map(user);

    const userModel = await this.prismaService.user.create({
      data,
    });

    return UserModelToEntityMapper.map(userModel);
  }

  public async findById(id: string): Promise<User | null> {
    const userModel = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!userModel) {
      return null;
    }

    return UserModelToEntityMapper.map(userModel);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const userModel = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!userModel) {
      return null;
    }

    return UserModelToEntityMapper.map(userModel);
  }

  public async update(user: User): Promise<void> {
    const data = UserEntityToModelMapper.map(user);

    await this.prismaService.user.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
