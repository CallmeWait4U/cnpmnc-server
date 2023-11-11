import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestDTO {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly reason: string;

  @IsNotEmpty()
  // @IsDateString()
  readonly startDate: string;

  @IsNotEmpty()
  // @IsDateString()
  readonly endDate: string;
}
