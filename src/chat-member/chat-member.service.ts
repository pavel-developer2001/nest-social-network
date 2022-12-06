import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMemberEntity } from './entities/chat-member.entity';

@Injectable()
export class ChatMemberService {
  constructor(
    @InjectRepository(ChatMemberEntity)
    private repository: Repository<ChatMemberEntity>,
  ) {}

  joinToChat(chatId, userId) {
    return this.repository.save({
      chat: { _id: chatId },
      user: { _id: userId },
    });
  }
  async checkFollower(id: number, userId: number) {
    const check = await this.repository.findOne({
      where: { _id: id, user: { _id: userId } },
    });
    if (check) return true;
    return false;
  }

  joinAdminForChat(chatId: number, userId: number) {
    return this.repository.save({
      isAdmin: true,
      chat: { _id: chatId },
      user: { _id: userId },
    });
  }

  findMembersByChat(id: number) {
    return this.repository.find({ where: { chat: { _id: id } } });
  }

  async unsubscribeByChat(chatId: number, userId: number) {
    try {
      const member = await this.repository.findOne({
        where: { chat: { _id: chatId }, user: { _id: userId } },
      });
      if (!member) {
        throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND);
      }
      if (member.user._id !== userId) {
        throw new HttpException(
          'Вы не можете удалить этот пост!',
          HttpStatus.FORBIDDEN,
        );
      }
      await this.repository.delete(member._id);
      return member;
    } catch (error) {
      console.log(error);
    }
  }
}
