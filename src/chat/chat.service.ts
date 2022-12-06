import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatEntity } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private repository: Repository<ChatEntity>,
  ) {}

  async create(createChatDto: CreateChatDto, userId: number) {
    try {
      return this.repository.save({ ...createChatDto, user: { _id: userId } });
    } catch (error) {
      console.log(error);
    }
  }
  async addChatImage(image: string, id: number) {
    try {
      if (!image) {
        return null;
      }
      await this.repository.update(id, { image });
      return await this.repository.findOne({ where: { _id: id } });
    } catch (error) {
      console.error('error', error);
    }
  }

  findAll() {
    return this.repository.find({
      order: {
        _id: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { _id: id } });
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
