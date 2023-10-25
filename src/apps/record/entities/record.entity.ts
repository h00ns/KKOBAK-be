import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/apps/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  @ApiProperty({
    example: 2023,
  })
  year: number;

  @Column()
  @ApiProperty({
    example: 12,
  })
  month: number;

  @Column()
  @ApiProperty({
    example: 31,
  })
  day: number;

  @ManyToOne(() => User, (user) => user.records)
  user: User;
}
