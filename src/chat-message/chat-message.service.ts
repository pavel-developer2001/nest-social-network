import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';
import { ChatMessageEntity } from './entities/chat-message.entity';

@Injectable()
export class ChatMessageService {
  constructor(
    @InjectRepository(ChatMessageEntity)
    private repository: Repository<ChatMessageEntity>,
  ) {}

  create(createChatMessageDto: CreateChatMessageDto, userId) {
    return this.repository.save({
      ...createChatMessageDto,
      chat: { _id: createChatMessageDto.chatId },
      user: { _id: userId },
    });
  }

  findAllByChat(id: number) {
    return this.repository.find({ where: { chat: { _id: id } } });
  }

  update(id: number, updateChatMessageDto: UpdateChatMessageDto) {
    return `This action updates a #${id} chatMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatMessage`;
  }
}
