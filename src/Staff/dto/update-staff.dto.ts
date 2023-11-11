import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateStaffDto } from './create-staff.dto';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {
  @IsNotEmpty()
  @IsString()
  readonly id: string;
  
  @IsOptional()
  @IsDate()
  readonly birthday?: Date;
  
  @IsOptional()
  @IsString()
  readonly name?: string;
  
  @IsOptional()
  @IsString()
  readonly gender?:string;
  
  @IsOptional()
  @IsString()  
  readonly address?:string;

  // @IsString()
  // readonly role: string;
}
