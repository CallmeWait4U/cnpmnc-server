import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { CreateStaffDto } from './create-staff.dto';


export class UpdateStaffDto extends PartialType(CreateStaffDto) {
  @IsNotEmpty()
  @IsString()
  readonly id: string;
  
  @IsDate()
  readonly birthday?: Date;
  
  @IsString()
  readonly name?: string;
  
  @IsString()
  readonly gender?:string;
  
  @IsString()  
  readonly address?:string;
  
  @IsString()
  readonly role?:string;
}