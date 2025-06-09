import { Type, Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  VersionColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @VersionColumn()
  version: number;

  @Column({ type: 'bigint' })
  @Type(() => Number)
  createdAt: number;

  @Column({ type: 'bigint' })
  @Type(() => Number)
  updatedAt: number;

  @BeforeInsert()
  setCreationTimestamp() {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  @BeforeUpdate()
  setUpdateTimestamp() {
    this.updatedAt = Date.now();
  }
}
