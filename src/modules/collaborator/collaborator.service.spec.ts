import { Test, TestingModule } from '@nestjs/testing';
import { CollaboratorService } from './collaborator.service';
import { UserRepository } from 'src/infra/database/prisma/repositories/user/user.repository';
import { MailService } from 'src/infra/mail/mail.service';
import { CollaboratorRepository } from 'src/infra/database/prisma/repositories/collaborator/collaborator.repository';
import { User } from '../auth/entities/user.entity';
import { ShoppingList } from '../shopping-list/entities/shopping-list.entity';
import { InviteCollaboratorDto } from './dto/invite-collaborator.dto';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/shared/decorators/active-user.decorator';
import { NotFoundException } from '@nestjs/common';

describe('CollaboratorService', () => {
  let service: CollaboratorService;
  let collaboratorRepository: CollaboratorRepository;
  let jwtService: JwtService;
  let userRepository: UserRepository;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollaboratorService,
        {
          provide: CollaboratorRepository,
          useValue: {
            sendInvitation: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('token'),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: MailService,
          useValue: {
            send: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    service = module.get<CollaboratorService>(CollaboratorService);
    collaboratorRepository = module.get<CollaboratorRepository>(
      CollaboratorRepository,
    );
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
    mailService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(collaboratorRepository).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(mailService).toBeDefined();
  });

  describe('send invitation', () => {
    it('should send invitation to an user to collaborate on a shopping list', async () => {
      const user: User = {
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca8',
        name: 'John',
        email: 'john@doe.com',
        password:
          '$2b$10$C3B2DiJugzy1JlkRW2a.YuehWjYMpB307Qg860GgNG0N4Fhfsfhei',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const shoppingList: ShoppingList = {
        id: '71149572-c7dd-49c9-9fc7-449c51dd6d4a',
        userId: 'afba4ee7-f233-4d6e-be33-f9a7574aeee3',
        name: 'new shopping list',
        createdAt: new Date(),
      };

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(user);

      const inviteCollaboratorDto: InviteCollaboratorDto = {
        email: user.email,
        shoppingListId: shoppingList.id,
      };

      const result = await service.sendInvitation(inviteCollaboratorDto);

      expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(mailService.send).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        sentTo: user.email,
      });
    });

    it('should throw a not found exception because user not found', async () => {
      const email = 'john@doe.com';
      const shoppingListId = '71149572-c7dd-49c9-9fc7-449c51dd6d4a';

      const inviteCollaboratorDto: InviteCollaboratorDto = {
        email,
        shoppingListId,
      };

      const notFoundException = new NotFoundException(
        `Solicitação de convite inválida`,
      );

      expect(service.sendInvitation(inviteCollaboratorDto)).rejects.toEqual(
        notFoundException,
      );
    });
  });

  describe('create a collaborator', () => {
    it('should create a colaborator', async () => {
      const user: User = {
        id: 'b6281bf4-bb46-490f-b59d-6db9e89f8ca8',
        name: 'John',
        email: 'john@doe.com',
        password:
          '$2b$10$C3B2DiJugzy1JlkRW2a.YuehWjYMpB307Qg860GgNG0N4Fhfsfhei',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(user);

      const shoppingList: ShoppingList = {
        id: '71149572-c7dd-49c9-9fc7-449c51dd6d4a',
        userId: 'afba4ee7-f233-4d6e-be33-f9a7574aeee3',
        name: 'new shopping list',
        createdAt: new Date(),
      };

      const userType: UserType = {
        id: user.id,
      };

      await service.create(userType, shoppingList.id);

      expect(userRepository.findById).toHaveBeenCalledTimes(1);
      expect(collaboratorRepository.create).toHaveBeenCalledTimes(1);
    });
  });
});
