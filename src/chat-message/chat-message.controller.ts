import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { ChatMessageService } from './chat-message.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';

@Controller('chat-message')
export class ChatMessageController {
  constructor(private readonly chatMessageService: ChatMessageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createChatMessageDto: CreateChatMessageDto,
    @User() userId: number,
  ) {
    return this.chatMessageService.create(createChatMessageDto, userId);
  }

  @Get(':id')
  findAllByChat(@Param('id') id: string) {
    return this.chatMessageService.findAllByChat(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChatMessageDto: UpdateChatMessageDto,
  ) {
    return this.chatMessageService.update(+id, updateChatMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatMessageService.remove(+id);
  }
}
