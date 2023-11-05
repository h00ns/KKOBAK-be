import { ApiProperty } from '@nestjs/swagger';
import { Record } from 'src/apps/record/entities/record.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'filter' })
export class Filter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({
    example: '월급',
  })
  name: string;

  @Column()
  @ApiProperty({
    example: 101,
  })
  code: number;

  @OneToMany(() => Record, (record) => record.filter)
  records: Record;
}
