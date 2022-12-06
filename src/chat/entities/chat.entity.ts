import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'chats' })
export class ChatEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  image?: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
