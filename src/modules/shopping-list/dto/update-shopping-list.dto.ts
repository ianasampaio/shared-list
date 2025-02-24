import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateShoppingListDto } from './create-shopping-list.dto';
import { IsString } from 'class-validator';

export class UpdateShoppingListDto {
  @IsString()
  @ApiProperty()
  name: string;
}
