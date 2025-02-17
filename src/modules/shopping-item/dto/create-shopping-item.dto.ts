import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShoppingItemDto {
  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  shoppingListId: string;
}
