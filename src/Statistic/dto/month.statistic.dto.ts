import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MonthStatisticDTO {
  @ApiProperty({ example: 5, type: Number })
  // @IsNumber()
  @IsNotEmpty()
  readonly month: number;
}
