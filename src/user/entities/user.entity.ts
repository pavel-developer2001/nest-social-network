import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'users' })
  export class UserEntity {
    @PrimaryGeneratedColumn()
    _id: number;
  
    @Column({
        unique: true,
      })
    name: string;
  
    @Column({
      unique: true,
    })
    email: string;
  
    @Column({ nullable: true })
    password?: string;
  
    @Column({ nullable: true })
    avatar?: string;
  
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  }
