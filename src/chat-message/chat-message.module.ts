import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageController } from './chat-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessageEntity } from './entities/chat-message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessageEntity]),
  ],
  controllers: [ChatMessageController],
  providers: [ChatMessageService]
})
export class ChatMessageModule {}
