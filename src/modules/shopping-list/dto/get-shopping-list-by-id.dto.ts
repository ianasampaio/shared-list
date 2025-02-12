import { ApiProperty } from '@nestjs/swagger';

export class GetShoppinListByIdResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}
