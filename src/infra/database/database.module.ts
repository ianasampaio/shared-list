import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from './prisma/repositories/user/user.repository';
import { ShoppingListRepository } from './prisma/repositories/shopping-list/shopping-list.repository';

@Global()
@Module({
  providers: [PrismaService, UserRepository, ShoppingListRepository],
  exports: [PrismaService, UserRepository, ShoppingListRepository],
})
export class DatabaseModule {}
