import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateStaffDto {
  @IsNotEmpty()
  @IsString()
  readonly avatar: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @IsNotEmpty()
  @IsString()
  readonly position: string;

  @IsNotEmpty()
  @IsString()
  readonly department: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsDateString()
  readonly birthday: Date;

  @IsNotEmpty()
  @IsString()
  readonly address: string;
}
