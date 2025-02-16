import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './infra/database/database.module';
import { ShoppingListModule } from './modules/shopping-list/shopping-list.module';
import { CollaboratorModule } from './modules/collaborator/collaborator.module';

@Module({
  imports: [DatabaseModule, AuthModule, ShoppingListModule, CollaboratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
