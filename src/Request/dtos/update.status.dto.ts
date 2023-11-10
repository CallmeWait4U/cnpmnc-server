import {IsNotEmpty, IsString } from 'class-validator';

export class UpdateStatusDTO {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly status: string;
}
