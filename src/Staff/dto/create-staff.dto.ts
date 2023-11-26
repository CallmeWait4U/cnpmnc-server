import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({
    example:
      'https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly avatar: string;

  @ApiProperty({ example: 'Tô Đại Thịnh', type: String })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ enum: ['Nam', 'Nữ'] })
  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  @ApiProperty({ example: 'STAFF-000001', type: String })
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @ApiProperty({ example: 'Nhân viên phụ trách', type: String })
  @IsNotEmpty()
  @IsString()
  readonly position: string;

  @ApiProperty({ example: 'Nhân sự', type: String })
  @IsNotEmpty()
  @IsString()
  readonly department: string;

  @ApiProperty({ example: '0123456789', type: String })
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @ApiProperty({ example: '01-01-1997', type: String })
  @IsNotEmpty()
  @IsDateString()
  birthday: Date;

  @ApiProperty({ example: 'Quận 1, TP Hồ Chí Minh', type: String })
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty({ example: '0123456789', type: String })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ example: '123456', type: String })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
