import { Module } from '@nestjs/common';
import { ChatMemberService } from './chat-member.service';
import { ChatMemberController } from './chat-member.controller';
import { ChatMemberEntity } from './entities/chat-member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMemberEntity])],
  controllers: [ChatMemberController],
  providers: [ChatMemberService],
  exports: [ChatMemberService],
})
export class ChatMemberModule {}
