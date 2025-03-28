import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from 'src/infra/database/prisma/repositories/user/user.repository';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: { findById: jest.fn() } },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('get user by id', () => {
    it('should return a user when found', async () => {
      const user = {
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca8',
        name: 'John Doe',
        email: 'john@example.com',
        password:
          '$2b$10$C3B2DiJugzy1JlkRW2a.YuehWjYMpB307Qg860GgNG0N4Fhfsfhei',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(userRepository, 'findById')
        .mockResolvedValueOnce(Promise.resolve(user));

      const result = await service.getUserById({
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca8',
      });

      expect(result).toEqual({ name: 'John Doe', email: 'john@example.com' });
      expect(userRepository.findById).toHaveBeenCalledWith(
        'b6281bf4-bb46-490f-b59d-6db9e89f8ca8',
      );
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(null);

      await expect(
        service.getUserById({ id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca0' }),
      ).rejects.toThrow(NotFoundException);

      expect(userRepository.findById).toHaveBeenCalledWith(
        'b6281bf4-bb46-490f-b59d-6db9e89f8ca0',
      );
    });
  });
});
