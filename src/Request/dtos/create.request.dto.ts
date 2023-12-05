import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestDTO {
  @ApiProperty({ example: '654eeaf9b0bf5ab90c614634', type: String, description: 'staffId' })
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @ApiProperty({ example: 'Bị bệnh', type: String })
  @IsNotEmpty()
  @IsString()
  readonly reason: string;

  @ApiProperty({ example: '2023-11-20T00:00:00.000Z', type: String })
  @IsNotEmpty()
  @IsDateString()
  readonly startDate: string;

  @ApiProperty({ example: '2023-11-23T00:00:00.000Z', type: String })
  @IsNotEmpty()
  @IsDateString()
  readonly endDate: string;
}
