import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ShoppingItemStatus } from '../entities/shopping-item.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShoppingItemDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsEnum(ShoppingItemStatus)
  @IsOptional()
  @ApiProperty({ enum: ShoppingItemStatus })
  status: ShoppingItemStatus;
}
