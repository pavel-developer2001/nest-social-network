import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/user/user.decorator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    @Inject(forwardRef(() => CloudinaryService))
    private cloudinary: CloudinaryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  findByUser(@User() userId: number) {
    return this.postService.findByUser(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @User() userId: number,
  ) {
    try {
      return await this.postService.updatePost(id, updatePostDto, userId);
    } catch (error) {
      console.log('errr', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
    @User() userId: number,
  ) {
    try {
      const newPost = await this.postService.create(createPostDto, userId);
      await this.cloudinary.uploadImagePost(file, newPost._id);
      return await this.postService.findOne(newPost._id);
    } catch (error) {
      console.log('error', error);
    }
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() userId: number) {
    return this.postService.remove(+id, userId);
  }
}
