import { ApiProperty } from '@nestjs/swagger';
import { Record } from 'src/apps/record/entities/record.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @Column({ nullable: true })
  @ApiProperty({
    example: null,
  })
  salaryDay: number;

  @OneToMany(() => Record, (record) => record.user)
  records: Record;

  @Column({ nullable: true })
  @ApiProperty({
    example: null,
  })
  profileImg: string;
}
