import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: 'abc@naver.com',
    description: 'email',
    required: true,
  })
  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'david',
    description: 'name',
    required: true,
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'qwert12345QWERT!@#$%',
    description: 'password',
    required: true,
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '2sbvl#dob-0)g9@#lodvjmsodv@#dov',
    description: 'image url',
    required: false,
  })
  @Column({ default: null })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
}
