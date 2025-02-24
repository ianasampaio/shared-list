import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ItemStatus } from '../entities/shopping-list.entity';

export class UpdateItemDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsEnum(ItemStatus)
  @IsOptional()
  @ApiProperty({ enum: ItemStatus })
  status: ItemStatus;
}
