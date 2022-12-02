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

@Entity({ name: 'chat-messages' })
export class ChatMessageEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  text: string;

  @ManyToOne(() => ChatEntity, { eager: true })
  chat: ChatEntity;

  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
