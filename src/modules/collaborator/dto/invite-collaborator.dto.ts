import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class InviteCollaboratorDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  shoppingListId: string;
}

export class InviteCollaboratorResponseDto {
  @IsString()
  @ApiProperty()
  sentTo: string;
}
