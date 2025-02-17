import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from './prisma/repositories/user/user.repository';
import { ShoppingListRepository } from './prisma/repositories/shopping-list/shopping-list.repository';
import { CollaboratorRepository } from './prisma/repositories/collaborator/collaborator.repository';
import { ShoppingItemRepository } from './prisma/repositories/shopping-item/shopping-item.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    ShoppingListRepository,
    CollaboratorRepository,
    ShoppingItemRepository,
  ],
  exports: [
    PrismaService,
    UserRepository,
    ShoppingListRepository,
    CollaboratorRepository,
    ShoppingItemRepository,
  ],
})
export class DatabaseModule {}
