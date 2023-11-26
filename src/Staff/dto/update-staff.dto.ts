import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateStaffDto } from './create-staff.dto';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {
  @ApiProperty({ type: String, description: 'staffId' })
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @ApiProperty({ example: '01-01-1998', type: String })
  @IsOptional()
  @IsDate()
  readonly birthday?: Date;

  @ApiProperty({ example: 'Nguyễn Đại Thịnh', type: String })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ enum: ['Nam', 'Nữ'] })
  @IsOptional()
  @IsString()
  readonly gender?: string;

  @ApiProperty({ example: 'Quận 10, TP Hồ Chí Minh', type: String })
  @IsOptional()
  @IsString()
  readonly address?: string;

  // @IsString()
  // readonly role: string;
}
