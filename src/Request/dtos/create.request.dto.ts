import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestDTO {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly reason: string;

  @IsNotEmpty()
  @IsDate()
  readonly startDate: Date;

  @IsNotEmpty()
  @IsDate()
  readonly endDate: Date;
}
