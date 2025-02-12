import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListRepository } from 'src/infra/database/prisma/repositories/shopping-list/shopping-list.repository';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UserType } from 'src/shared/decorators/active-user.decorator';
import { ShoppingList } from './entities/shopping-list.entity';
import { NotFoundException } from '@nestjs/common';

describe('ShoppingListService', () => {
  let service: ShoppingListService;
  let shoppingListRepository: ShoppingListRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingListService,
        {
          provide: ShoppingListRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(null),
            list: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(null),
            delete: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    service = module.get<ShoppingListService>(ShoppingListService);
    shoppingListRepository = module.get<ShoppingListRepository>(
      ShoppingListRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a shopping list', async () => {
      const createInput: CreateShoppingListDto = {
        name: 'lista de compras',
      };

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      await service.create(user, createInput);

      expect(shoppingListRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('list', () => {
    it('should list shopping lists', async () => {
      const shoppingList: ShoppingList = {
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
        name: 'lista de compras',
        userId: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        createdAt: new Date(),
      };

      jest
        .spyOn(shoppingListRepository, 'list')
        .mockResolvedValueOnce([shoppingList]);

      const response = await service.list();

      expect(response).toBeDefined();
      expect(response).toEqual([shoppingList]);
    });
  });

  describe('get by id', () => {
    it('should get a shopping list by id', async () => {
      const shoppingList: ShoppingList = {
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
        name: 'lista de compras',
        userId: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        createdAt: new Date(),
      };

      jest
        .spyOn(shoppingListRepository, 'findById')
        .mockResolvedValueOnce(shoppingList);

      const response = await service.getById(shoppingList.id);

      expect(response).toBeDefined();
      expect(response).toEqual(shoppingList);
      expect(shoppingListRepository.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception when shopping list is not found', async () => {
      const id = 'id';

      const notFoundException = new NotFoundException(
        `shopping list ${id} not found`,
      );

      expect(service.getById(id)).rejects.toEqual(notFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a shopping list', async () => {
      const shoppingList: ShoppingList = {
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
        name: 'lista de compras',
        userId: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        createdAt: new Date(),
      };

      jest
        .spyOn(shoppingListRepository, 'findById')
        .mockResolvedValueOnce(shoppingList);

      await service.delete('id');
      expect(shoppingListRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception when shopping list is not found', async () => {
      const id = 'id';

      const notFoundException = new NotFoundException(
        `shopping list ${id} not found`,
      );

      expect(service.getById(id)).rejects.toEqual(notFoundException);
    });
  });
});
