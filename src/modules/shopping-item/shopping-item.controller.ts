import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ShoppingItemService } from './shopping-item.service';
import { CreateShoppingItemDto } from './dto/create-shopping-item.dto';
import { UpdateShoppingItemDto } from './dto/update-shopping-item.dto';
import { ApiOperation } from '@nestjs/swagger';
import {
  ActiveUser,
  UserType,
} from 'src/shared/decorators/active-user.decorator';
import { AuthValidationInterceptor } from 'src/shared/interceptors/auth.interceptor';

@Controller('shopping-items')
@UseInterceptors(AuthValidationInterceptor)
export class ShoppingItemController {
  constructor(private readonly shoppingItemService: ShoppingItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a shopping item' })
  create(
    @Body() createShoppingItemDto: CreateShoppingItemDto,
    @ActiveUser() userType: UserType,
  ) {
    return this.shoppingItemService.create(userType, createShoppingItemDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a shopping item' })
  update(
    @Param('id') id: string,
    @Body() updateShoppingItemDto: UpdateShoppingItemDto,
    @ActiveUser() userType: UserType,
  ) {
    return this.shoppingItemService.update(id, userType, updateShoppingItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a shopping item' })
  remove(@Param('id') id: string) {
    return this.shoppingItemService.delete(id);
  }
}
