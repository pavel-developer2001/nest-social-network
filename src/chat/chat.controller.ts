import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  forwardRef,
  Inject,
  UseInterceptors,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { ChatMemberService } from 'src/chat-member/chat-member.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    @Inject(forwardRef(() => CloudinaryService))
    private cloudinary: CloudinaryService,
    private chatMemberService:ChatMemberService
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @Body() createChatDto: CreateChatDto,
    @UploadedFile() file: Express.Multer.File,
    @User() userId: number,
  ) {
    const newChat = await this.chatService.create(createChatDto, userId);
    await this.cloudinary.uploadImageChat(file, newChat._id);
    await this.chatMemberService.joinAdminForChat(newChat._id, userId)
    return;
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
