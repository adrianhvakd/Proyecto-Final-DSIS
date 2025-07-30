import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  names: string;

  @Column()
  lastNames: string;

  @Column()
  password: string;

  @Column({ default: true})
  isActive: boolean;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false})
  pwIsDefault: boolean;


}