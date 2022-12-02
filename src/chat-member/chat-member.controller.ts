import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { ChatMemberService } from './chat-member.service';

@Controller('chat-member')
export class ChatMemberController {
  constructor(private readonly chatMemberService: ChatMemberService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/join/:id')
  create(@Param('id') id: string, @User() userId: number) {
    return this.chatMemberService.joinToChat(id, userId);
  }


  @Get(':id')
  findMembersByChat(@Param('id') id: string) {
    return this.chatMemberService.findMembersByChat(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  unsubscribeByChat(@Param('id') id: string,@User() userId: number) {
    return this.chatMemberService.unsubscribeByChat(+id,userId);
  }
}
