import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from './prisma/repositories/user/user.repository';
import { ShoppingListRepository } from './prisma/repositories/shopping-list/shopping-list.repository';
import { CollaboratorRepository } from './prisma/repositories/collaborator/collaborator.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    ShoppingListRepository,
    CollaboratorRepository,
  ],
  exports: [
    PrismaService,
    UserRepository,
    ShoppingListRepository,
    CollaboratorRepository,
  ],
})
export class DatabaseModule {}
