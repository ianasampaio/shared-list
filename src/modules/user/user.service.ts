import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/infra/database/prisma/repositories/user/user.repository';
import { UserType } from 'src/shared/decorators/active-user.decorator';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userType: UserType) {
    const user = await this.userRepository.findById(userType.id);

    if (!user) {
      throw new NotFoundException(`user not found`);
    }

    const result = {
      name: user.name,
      email: user.email,
    };

    return result;
  }
}
