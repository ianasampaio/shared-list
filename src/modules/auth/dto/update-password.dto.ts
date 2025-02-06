import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsJWT()
  @ApiProperty()
  token: string;

  @IsString()
  @ApiProperty()
  newPassword: string;

  @IsString()
  @ApiProperty()
  newPasswordConfirmation: string;
}
