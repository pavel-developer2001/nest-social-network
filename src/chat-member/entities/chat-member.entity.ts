import { ChatEntity } from 'src/chat/entities/chat.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'chat-members' })
export class ChatMemberEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ default: false })
  isAdmin: boolean;

  @ManyToOne(() => ChatEntity, { eager: true })
  chat: ChatEntity;

  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
