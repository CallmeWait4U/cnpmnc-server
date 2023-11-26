import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestDTO {
  @ApiProperty({ type: String, description: 'staffId' })
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @ApiProperty({ example: 'Bị bệnh', type: String })
  @IsNotEmpty()
  @IsString()
  readonly reason: string;

  @ApiProperty({ example: '20-11-2023', type: String })
  @IsNotEmpty()
  @IsDateString()
  readonly startDate: string;

  @ApiProperty({ example: '23-11-2023', type: String })
  @IsNotEmpty()
  @IsDateString()
  readonly endDate: string;
}
