import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example: 'bhewohbopwehbjopwejbw.dsjbopajbewopjbopwej.jew0bej4bdsdgokpbkljasd',
    description: 'jwt token',
  })
  token: string;
}
