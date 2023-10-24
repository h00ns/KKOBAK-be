import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'record' })
export class Record {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    example: '급여',
  })
  title: string;

  @Column()
  @ApiProperty({
    example: 2000000,
  })
  value: number;

  @Column()
  @ApiProperty({
    example: 'income',
  })
  type: 'income' | 'outcome';

  @CreateDateColumn()
  @ApiProperty({
    example: '2023-10-16T14:30:00.000Z',
  })
  date: Date;
}
