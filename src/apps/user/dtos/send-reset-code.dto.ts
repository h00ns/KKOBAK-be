import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendResetCodeDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'kkobak@gmail.com',
  })
  readonly email: string;
}
