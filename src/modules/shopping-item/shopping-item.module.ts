import { Module } from '@nestjs/common';
import { ShoppingItemService } from './shopping-item.service';
import { ShoppingItemController } from './shopping-item.controller';

@Module({
  controllers: [ShoppingItemController],
  providers: [ShoppingItemService],
})
export class ShoppingItemModule {}
