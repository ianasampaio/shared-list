import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoppingItemDto } from './dto/create-shopping-item.dto';
import { UpdateShoppingItemDto } from './dto/update-shopping-item.dto';
import { UserType } from 'src/shared/decorators/active-user.decorator';
import { ShoppingItemRepository } from 'src/infra/database/prisma/repositories/shopping-item/shopping-item.repository';
import { UUIDGenerator } from 'src/shared/uuid-generator';
import { ShoppingItemStatus } from './entities/shopping-item.entity';

@Injectable()
export class ShoppingItemService {
  constructor(
    private readonly shoppingItemRepository: ShoppingItemRepository,
  ) {}

  public async create(
    userType: UserType,
    createShoppingItemDto: CreateShoppingItemDto,
  ) {
    const now = new Date();

    await this.shoppingItemRepository.create({
      id: UUIDGenerator.generate(),
      description: createShoppingItemDto.description,
      status: ShoppingItemStatus.PENDING,
      shoppingListId: createShoppingItemDto.shoppingListId,
      modifiedBy: userType.id,
      updatedAt: now,
    });
  }

  public async update(
    id: string,
    userType: UserType,
    updateShoppingItemDto: UpdateShoppingItemDto,
  ) {
    const now = new Date();

    const shoppingItem = await this.shoppingItemRepository.findById(id);

    if (!shoppingItem) {
      throw new NotFoundException(`Shopping Item not found`);
    }

    const data = {
      ...shoppingItem,
      ...updateShoppingItemDto,
      modifiedBy: userType.id,
      updatedAt: now,
    };

    await this.shoppingItemRepository.update(data);
  }

  public async delete(id: string) {
    const shoppingItem = await this.shoppingItemRepository.findById(id);

    if (!shoppingItem) {
      throw new NotFoundException(`Shopping Item not found`);
    }

    await this.shoppingItemRepository.delete(id);
  }
}
