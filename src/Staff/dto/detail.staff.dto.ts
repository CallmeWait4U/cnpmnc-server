import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DetailStaffDTO {
  @ApiProperty({ type: String, description: 'staffId' })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
