import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ActiveUser,
  UserType,
} from 'src/shared/decorators/active-user.decorator';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { ShoppingListService } from './shopping-list.service';
import { AuthValidationInterceptor } from 'src/shared/interceptors/auth.interceptor';
import { GetShoppinListByIdResponseDto } from './dto/get-shopping-list-by-id.dto';

@Controller('shopping-list')
@UseInterceptors(AuthValidationInterceptor)
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Post()
  @ApiOperation({ summary: 'Create a shopping list' })
  create(
    @Body() createShoppingListDto: CreateShoppingListDto,
    @ActiveUser() userType: UserType,
  ) {
    return this.shoppingListService.create(userType, createShoppingListDto);
  }

  @Get()
  @ApiOperation({ summary: 'List shopping lists' })
  findAll() {
    return this.shoppingListService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shopping list by id' })
  @ApiResponse({ type: GetShoppinListByIdResponseDto })
  findOne(@Param('id') id: string) {
    return this.shoppingListService.getById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a shopping list' })
  remove(@Param('id') id: string) {
    return this.shoppingListService.delete(id);
  }
}
