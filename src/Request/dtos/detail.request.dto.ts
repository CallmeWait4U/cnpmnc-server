import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DetailRequestDTO {
  @ApiProperty({ type: String, description: 'requestId' })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
