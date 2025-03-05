import { Module } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';
import { ShoppingListEventsModule } from '../shopping-list-events/shopping-list-events.module';

@Module({
  controllers: [ShoppingListController],
  providers: [ShoppingListService, ShoppingListEventsModule],
})
export class ShoppingListModule {}
