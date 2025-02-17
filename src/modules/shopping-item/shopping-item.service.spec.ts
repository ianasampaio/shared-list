import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingItemService } from './shopping-item.service';
import { ShoppingItemRepository } from 'src/infra/database/prisma/repositories/shopping-item/shopping-item.repository';
import { UserType } from 'src/shared/decorators/active-user.decorator';
import { CreateShoppingItemDto } from './dto/create-shopping-item.dto';
import {
  ShoppingItem,
  ShoppingItemStatus,
} from './entities/shopping-item.entity';
import { UpdateShoppingItemDto } from './dto/update-shopping-item.dto';
import { NotFoundException } from '@nestjs/common';

describe('ShoppingItemService', () => {
  let service: ShoppingItemService;
  let shoppingItemRepository: ShoppingItemRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingItemService,
        {
          provide: ShoppingItemRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(null),
            update: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(null),
            delete: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    service = module.get<ShoppingItemService>(ShoppingItemService);
    shoppingItemRepository = module.get<ShoppingItemRepository>(
      ShoppingItemRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(shoppingItemRepository).toBeDefined();
  });

  describe('create a shopping item', () => {
    it('should create a shopping item', async () => {
      const createInput: CreateShoppingItemDto = {
        description: 'shopping item',
        shoppingListId: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
      };

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      await service.create(user, createInput);

      expect(shoppingItemRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update a shopping item', () => {
    it('should update a shopping item', async () => {
      const shoppingItem: ShoppingItem = {
        id: '9530b100-ea04-4e6c-a886-629cac717e34',
        description: 'shopping item',
        status: ShoppingItemStatus.PENDING,
        shoppingListId: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
        modifiedBy: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        updatedAt: new Date(),
      };

      jest
        .spyOn(shoppingItemRepository, 'findById')
        .mockResolvedValueOnce(shoppingItem);

      const updateInput: UpdateShoppingItemDto = {
        description: 'new description to shopping item',
        status: ShoppingItemStatus.PURCHASED,
      };

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      await service.update('id', user, updateInput);

      expect(shoppingItemRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception when shopping item not found', async () => {
      const id = 'id';

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      const updateInput: UpdateShoppingItemDto = {
        description: 'new description to shopping item',
        status: ShoppingItemStatus.PURCHASED,
      };

      const notFoundException = new NotFoundException(
        `Shopping Item not found`,
      );

      expect(service.update(id, user, updateInput)).rejects.toEqual(
        notFoundException,
      );
    });
  });

  describe('delete a shopping item', () => {
    it('shoul delete a shopping item', async () => {
      const shoppingItem: ShoppingItem = {
        id: '9530b100-ea04-4e6c-a886-629cac717e34',
        description: 'shopping item',
        status: ShoppingItemStatus.PENDING,
        shoppingListId: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
        modifiedBy: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        updatedAt: new Date(),
      };

      jest
        .spyOn(shoppingItemRepository, 'findById')
        .mockResolvedValueOnce(shoppingItem);

      await service.delete('id');
      expect(shoppingItemRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception when shopping item is not found', async () => {
      const id = 'id';

      const notFoundException = new NotFoundException(
        `Shopping Item not found`,
      );

      expect(service.delete(id)).rejects.toEqual(notFoundException);
    });
  });
});
