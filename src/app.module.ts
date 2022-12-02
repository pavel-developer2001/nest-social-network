import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPosgresConfig } from './config/postgres.config';
import { UserModule } from './user/user.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { PostModule } from './post/post.module';
import { ChatModule } from './chat/chat.module';
import { ChatMemberModule } from './chat-member/chat-member.module';
import { ChatMessageModule } from './chat-message/chat-message.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPosgresConfig,
    }),
    UserModule,
    CloudinaryModule,
    AuthModule,
    TokenModule,
    PostModule,
    ChatModule,
    ChatMemberModule,
    ChatMessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
