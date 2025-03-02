import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListRepository } from 'src/infra/database/prisma/repositories/shopping-list/shopping-list.repository';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UserType } from 'src/shared/decorators/active-user.decorator';
import {
  ItemStatus,
  ShoppingList,
  ShoppingListItem,
} from './entities/shopping-list.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { UpdateItemDto } from './dto/update-item.dto';

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
            listShoppingList: jest.fn().mockResolvedValue(null),
            findShoppingListById: jest.fn().mockResolvedValue(null),
            updateShoppingList: jest.fn().mockResolvedValue(null),
            deleteShoppingList: jest.fn().mockResolvedValue(null),
            addItem: jest.fn().mockResolvedValue(null),
            updateItem: jest.fn().mockResolvedValue(null),
            findItemById: jest.fn().mockResolvedValue(null),
            deleteItem: jest.fn().mockResolvedValue(null),
            listCollaboratorsFromShoppingList: jest
              .fn()
              .mockResolvedValue(['Colaborador 1', 'Colaborador 2']),
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
    expect(shoppingListRepository).toBeDefined();
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

  describe('list shopping list', () => {
    it('should list shopping lists', async () => {
      const shoppingList: ShoppingList = {
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
        name: 'lista de compras',
        ownerId: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(shoppingListRepository, 'listShoppingList')
        .mockResolvedValueOnce([shoppingList]);

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      const response = await service.listShoppingList(user);

      expect(response).toBeDefined();
      expect(response).toEqual([shoppingList]);
    });
  });

  describe('get shopping list by id', () => {
    it('should get a shopping list by id', async () => {
      const shoppingList: ShoppingList = {
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
        name: 'lista de compras',
        ownerId: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(shoppingListRepository, 'findShoppingListById')
        .mockResolvedValueOnce(shoppingList);

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      const response = await service.getShoppingListById(user, shoppingList.id);

      expect(response).toBeDefined();
      expect(response).toEqual(shoppingList);
      expect(shoppingListRepository.findShoppingListById).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should throw a not found exception when shopping list is not found', async () => {
      const id = 'id';

      const notFoundException = new NotFoundException(
        `Shopping list not found`,
      );

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      expect(service.getShoppingListById(user, id)).rejects.toEqual(
        notFoundException,
      );
    });
  });

  describe('update shopping list', () => {
    it('should update a shopping list', async () => {
      const shoppingList: ShoppingList = {
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
        name: 'lista de compras',
        ownerId: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(shoppingListRepository, 'findShoppingListById')
        .mockResolvedValueOnce(shoppingList);

      const updateInput: UpdateShoppingListDto = {
        name: 'lista de compras',
      };

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      await service.updateShoppingList(user, shoppingList.id, updateInput);

      expect(shoppingListRepository.findShoppingListById).toHaveBeenCalledTimes(
        1,
      );
      expect(shoppingListRepository.updateShoppingList).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should throw a not found exception when shopping list is not found', async () => {
      const id = 'id';

      const notFoundException = new NotFoundException(
        `Shopping list not found`,
      );

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      expect(service.getShoppingListById(user, id)).rejects.toEqual(
        notFoundException,
      );
    });
  });

  describe('delete shopping list', () => {
    it('should delete a shopping list', async () => {
      const shoppingList: ShoppingList = {
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
        name: 'lista de compras',
        ownerId: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(shoppingListRepository, 'findShoppingListById')
        .mockResolvedValueOnce(shoppingList);

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      await service.deleteShoppingList(user, shoppingList.id);

      expect(shoppingListRepository.deleteShoppingList).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should throw a not found exception when shopping list is not found', async () => {
      const id = 'id';

      const notFoundException = new NotFoundException(
        `Shopping list not found`,
      );

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      expect(service.getShoppingListById(user, id)).rejects.toEqual(
        notFoundException,
      );
    });
  });

  describe('add an item', () => {
    it('should add an item to a shopping list', async () => {
      const shoppingList: ShoppingList = {
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
        name: 'lista de compras',
        ownerId: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(shoppingListRepository, 'findShoppingListById')
        .mockResolvedValueOnce(shoppingList);

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      const itemInput: ShoppingListItem = {
        id: '3df6e69d-60ea-493e-bf44-f3d520e22932',
        description: 'item',
        status: ItemStatus.PENDING,
        modifiedBy: user.id,
        updatedAt: new Date(),
        shoppingListId: shoppingList.id,
      };

      await service.addItem(user, shoppingList.id, itemInput);

      expect(shoppingListRepository.addItem).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception when shopping list is not found', async () => {
      const id = 'id';

      const notFoundException = new NotFoundException(
        `Shopping list not found`,
      );

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      expect(service.getShoppingListById(user, id)).rejects.toEqual(
        notFoundException,
      );
    });
  });

  describe('update an item', () => {
    it('should update an item', async () => {
      const shoppingList: ShoppingList = {
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
        name: 'lista de compras',
        ownerId: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(shoppingListRepository, 'findShoppingListById')
        .mockResolvedValueOnce(shoppingList);

      const item: ShoppingListItem = {
        id: '3df6e69d-60ea-493e-bf44-f3d520e22932',
        description: 'item',
        status: ItemStatus.PENDING,
        modifiedBy: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        updatedAt: new Date(),
        shoppingListId: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
      };

      jest
        .spyOn(shoppingListRepository, 'findItemById')
        .mockResolvedValueOnce(item);

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      const updateItemInput: UpdateItemDto = {
        description: 'item',
        status: ItemStatus.PENDING,
      };

      await service.updateItem(user, shoppingList.id, item.id, updateItemInput);

      expect(shoppingListRepository.updateItem).toHaveBeenCalledTimes(1);
      expect(shoppingListRepository.findShoppingListById).toHaveBeenCalledTimes(
        1,
      );
      expect(shoppingListRepository.findItemById).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception when shopping list is not found', async () => {
      const id = 'id';

      const notFoundException = new NotFoundException(
        `Shopping list not found`,
      );

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      expect(service.getShoppingListById(user, id)).rejects.toEqual(
        notFoundException,
      );
    });
  });

  describe('delete an item', () => {
    it('should delete an item', async () => {
      const shoppingList: ShoppingList = {
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
        name: 'lista de compras',
        ownerId: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(shoppingListRepository, 'findShoppingListById')
        .mockResolvedValueOnce(shoppingList);

      const item: ShoppingListItem = {
        id: '3df6e69d-60ea-493e-bf44-f3d520e22932',
        description: 'item',
        status: ItemStatus.PENDING,
        modifiedBy: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        updatedAt: new Date(),
        shoppingListId: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
      };

      jest
        .spyOn(shoppingListRepository, 'findItemById')
        .mockResolvedValueOnce(item);

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      await service.deleteItem(user, shoppingList.id, item.id);

      expect(shoppingListRepository.deleteItem).toHaveBeenCalledTimes(1);
      expect(shoppingListRepository.findShoppingListById).toHaveBeenCalledTimes(
        1,
      );
      expect(shoppingListRepository.findItemById).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception when shopping list is not found', async () => {
      const id = 'id';

      const notFoundException = new NotFoundException(
        `Shopping list not found`,
      );

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      expect(service.getShoppingListById(user, id)).rejects.toEqual(
        notFoundException,
      );
    });
  });

  describe('list collaborators from a shopping list', () => {
    it('should list collaborators from a shopping list', async () => {
      const shoppingList: ShoppingList = {
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca4',
        name: 'lista de compras',
        ownerId: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
        createdAt: new Date(),
        updatedAt: new Date(),
        collaborators: [{ name: 'Colaborador 1' }, { name: 'Colaborador 2' }],
      };

      jest
        .spyOn(shoppingListRepository, 'findShoppingListById')
        .mockResolvedValueOnce(shoppingList);

      const user: UserType = {
        id: '8cb4c3b7-0933-4c70-b307-0ced2dc3f4f9',
      };

      const response = await service.listCollaboratorsFromShoppingList(
        user,
        shoppingList.id,
      );

      expect(response).toBeDefined();
      expect(response).toEqual(['Colaborador 1', 'Colaborador 2']);
      expect(shoppingListRepository.findShoppingListById).toHaveBeenCalledTimes(
        1,
      );
    });
  });
});
