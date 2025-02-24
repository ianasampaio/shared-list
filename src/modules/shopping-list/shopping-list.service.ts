import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ShoppingListRepository } from 'src/infra/database/prisma/repositories/shopping-list/shopping-list.repository';
import { UserType } from 'src/shared/decorators/active-user.decorator';
import { UUIDGenerator } from 'src/shared/uuid-generator';
import { CreateItemDto } from './dto/create-item.dto';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { ItemStatus } from './entities/shopping-list.entity';

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
      ownerId: userType.id,
      createdAt: now,
      updatedAt: now,
    });
  }

  public async listShoppingList(userType: UserType) {
    return this.shoppingListRepository.listShoppingList(userType);
  }

  public async getShoppingListById(userType: UserType, id: string) {
    const shoppingList = await this.shoppingListRepository.findShoppingListById(
      userType,
      id,
    );

    if (!shoppingList) {
      throw new NotFoundException(`Shopping list not found`);
    }

    return shoppingList;
  }

  public async updateShoppingList(
    userType: UserType,
    id: string,
    updateShoppingListDto: UpdateShoppingListDto,
  ) {
    const now = new Date();

    const shoppingList = await this.shoppingListRepository.findShoppingListById(
      userType,
      id,
    );

    if (!shoppingList) {
      throw new NotFoundException('Shopping list not found');
    }

    if (shoppingList.ownerId !== userType.id) {
      throw new ForbiddenException('Not allowed');
    }

    const data = {
      ...shoppingList,
      name: updateShoppingListDto.name,
      updatedAt: now,
    };

    await this.shoppingListRepository.updateShoppingList(userType, data);
  }

  public async deleteShoppingList(userType: UserType, id: string) {
    const shoppingList = await this.shoppingListRepository.findShoppingListById(
      userType,
      id,
    );

    if (!shoppingList) {
      throw new NotFoundException(`Shopping list not found`);
    }

    if (shoppingList.ownerId !== userType.id) {
      throw new ForbiddenException('Not allowed');
    }

    await this.shoppingListRepository.deleteShoppingList(userType, id);
  }

  public async addItem(
    userType: UserType,
    id: string,
    createItemDto: CreateItemDto,
  ) {
    const now = new Date();

    const shoppingList = await this.shoppingListRepository.findShoppingListById(
      userType,
      id,
    );

    if (!shoppingList) {
      throw new NotFoundException(`Shopping list not found`);
    }

    const data = {
      id: UUIDGenerator.generate(),
      description: createItemDto.description,
      status: ItemStatus.PENDING,
      modifiedBy: userType.id,
      updatedAt: now,
      shoppingListId: shoppingList.id,
    };

    await this.shoppingListRepository.addItem(userType, data);
  }

  public async updateItem(
    userType: UserType,
    shoppingListId: string,
    itemId: string,
    updateItemDto: UpdateItemDto,
  ) {
    const now = new Date();

    const shoppingList = await this.shoppingListRepository.findShoppingListById(
      userType,
      shoppingListId,
    );

    if (!shoppingList) {
      throw new NotFoundException(`Shopping list not found`);
    }

    const item = await this.shoppingListRepository.findItemById(
      itemId,
      shoppingList.id,
    );

    if (!item) {
      throw new NotFoundException(`Item not found`);
    }

    const data = {
      ...item,
      ...updateItemDto,
      modifiedBy: userType.id,
      updatedAt: now,
    };

    await this.shoppingListRepository.updateItem(data);
  }

  public async deleteItem(
    userType: UserType,
    shoppingListId: string,
    itemId: string,
  ) {
    const shoppingList = await this.shoppingListRepository.findShoppingListById(
      userType,
      shoppingListId,
    );

    if (!shoppingList) {
      throw new NotFoundException(`Shopping list not found`);
    }

    const item = await this.shoppingListRepository.findItemById(
      itemId,
      shoppingList.id,
    );

    if (!item) {
      throw new NotFoundException(`Item not found`);
    }

    await this.shoppingListRepository.deleteItem(shoppingListId, itemId);
  }
}
