import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @ApiProperty({ example: '0123456789', type: String })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: '123456', type: String })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
