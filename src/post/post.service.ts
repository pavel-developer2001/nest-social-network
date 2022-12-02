import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import console from 'console';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    try {
      return await this.repository.save({
        ...createPostDto,
        user: { _id: userId },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async addPostImage(image: string, id: number) {
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
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { _id: id } });
  }

  findByUser(userId: number) {
    return this.repository.find({ where: { user: { _id: userId } } });
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    try {
      await this.repository.update(id, {
        text: updatePostDto.text,
        user: { _id: userId },
      });
      return this.repository.findOne({ where: { _id: id } });
    } catch (error) {
      console.error('error', error);
    }
  }

  async remove(id: number, userId: number) {
    try {
      const post = await this.repository.findOne({ where: { _id: id } });
      if (!post) {
        throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND);
      }
      if (post.user._id !== userId) {
        throw new HttpException(
          'Вы не можете удалить этот пост!',
          HttpStatus.FORBIDDEN,
        );
      }
      await this.repository.delete(post._id);
      return post;
    } catch (error) {
      console.log(error);
    }
  }
}
