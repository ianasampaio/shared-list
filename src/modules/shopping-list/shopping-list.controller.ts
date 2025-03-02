import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ActiveUser,
  UserType,
} from 'src/shared/decorators/active-user.decorator';
import { AuthValidationInterceptor } from 'src/shared/interceptors/auth.interceptor';
import { CreateItemDto } from './dto/create-item.dto';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { GetShoppinListByIdResponseDto } from './dto/get-shopping-list-by-id.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { ShoppingListService } from './shopping-list.service';

@Controller('shopping-list')
@UseInterceptors(AuthValidationInterceptor)
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Post()
  @ApiOperation({ summary: 'Create a shopping list' })
  create(
    @ActiveUser() userType: UserType,
    @Body() createShoppingListDto: CreateShoppingListDto,
  ) {
    return this.shoppingListService.create(userType, createShoppingListDto);
  }

  @Get()
  @ApiOperation({ summary: 'List shopping lists' })
  list(@ActiveUser() userType: UserType) {
    return this.shoppingListService.listShoppingList(userType);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shopping list by id' })
  @ApiResponse({ type: GetShoppinListByIdResponseDto })
  getShoppingListById(
    @Param('id') id: string,
    @ActiveUser() userType: UserType,
  ) {
    return this.shoppingListService.getShoppingListById(userType, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update shopping list' })
  updateShoppingList(
    @ActiveUser() userType: UserType,
    @Param('id') id: string,
    @Body() updateShoppingListDto: UpdateShoppingListDto,
  ) {
    return this.shoppingListService.updateShoppingList(
      userType,
      id,
      updateShoppingListDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a shopping list' })
  deleteShoppingList(
    @Param('id') id: string,
    @ActiveUser() userType: UserType,
  ) {
    return this.shoppingListService.deleteShoppingList(userType, id);
  }

  @Patch(':id/item')
  @ApiOperation({ summary: 'Add an item to a shopping list' })
  addItem(
    @ActiveUser() userType: UserType,
    @Param('id') id: string,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.shoppingListService.addItem(userType, id, createItemDto);
  }

  @Patch(':shoppingListId/item/:itemId')
  @ApiOperation({ summary: 'Update an item' })
  updateItem(
    @ActiveUser() userType: UserType,
    @Param('shoppingListId') shoppingListId: string,
    @Param('itemId') itemId: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.shoppingListService.updateItem(
      userType,
      shoppingListId,
      itemId,
      updateItemDto,
    );
  }

  @Delete(':shoppingListId/item/:itemId')
  @ApiOperation({ summary: 'Delete an item' })
  deleteItem(
    @ActiveUser() userType: UserType,
    @Param('shoppingListId') shoppingListId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.shoppingListService.deleteItem(
      userType,
      shoppingListId,
      itemId,
    );
  }

  @Get(':id/collaborators')
  @ApiOperation({ summary: 'Get collaborators from a shopping list' })
  listCollaboratorsFromShoppingList(
    @ActiveUser() userType: UserType,
    @Param('id') id: string,
  ) {
    return this.shoppingListService.listCollaboratorsFromShoppingList(
      userType,
      id,
    );
  }
}
