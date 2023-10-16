import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'kkobak@gmail.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    example: 'kkobak',
  })
  name: string;

  @Column()
  @ApiProperty({
    example: '@@!qwe!@#123zxc',
  })
  password: string;

  @CreateDateColumn()
  @ApiProperty({
    example: '2023-10-16T14:30:00.000Z',
  })
  createdAt: Date;

  @Column({ nullable: true }) // default: null
  @ApiProperty({
    example: null,
  })
  resetCode: string;
}
