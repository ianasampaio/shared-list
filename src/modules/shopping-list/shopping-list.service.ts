import { Injectable, NotFoundException } from '@nestjs/common';
import { ShoppingListRepository } from 'src/infra/database/prisma/repositories/shopping-list/shopping-list.repository';
import { UserType } from 'src/shared/decorators/active-user.decorator';
import { UUIDGenerator } from 'src/shared/uuid-generator';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';

@Injectable()
export class ShoppingListService {
  constructor(
    private readonly shoppingListRepository: ShoppingListRepository,
  ) {}

  public async create(
    userType: UserType,
    createShoppingListDto: CreateShoppingListDto,
  ) {
    const now = new Date();

    await this.shoppingListRepository.create({
      id: UUIDGenerator.generate(),
      name: createShoppingListDto.name,
      userId: userType.id,
      createdAt: now,
    });
  }

  public async list() {
    return this.shoppingListRepository.list();
  }

  public async getById(id: string) {
    const shoppingList = await this.shoppingListRepository.findById(id);

    if (!shoppingList) {
      throw new NotFoundException(`shopping list ${id} not found`);
    }

    return shoppingList;
  }

  public async delete(id: string) {
    const shoppingList = await this.shoppingListRepository.findById(id);

    if (!shoppingList) {
      throw new NotFoundException(`shopping list ${id} not found`);
    }

    await this.shoppingListRepository.delete(id);
  }
}
